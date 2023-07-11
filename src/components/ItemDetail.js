import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
//MUI imports
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleIcon from "@mui/icons-material/AddCircle";
//Components imports
import { STATISTICS_LABEL } from "../Constant";
import {
  DATE_FORMATTER,
  HANDLE_SORT,
} from "../helperFunctions/HelperFunctions";
import Alert from "./Alert";
import PurchaseDetail from "./PurchaseDetail";
import AddGroceryButton from "./buttons/AddGroceryButton";
import PriceHistoryButton from "./buttons/PriceHistoryButton";
import UsageHistoryButton from "./buttons/UsageHistoryButton";
import AddStockPopup from "../popups/AddStockPopup";
import UsageHistoryPopup from "../popups/UsageHistoryPopup";
import AddedToGroceryListPopup from "../popups/AddedToGroceryListPopup";
import EditItemDetailPopup from "../popups/EditItemDetailPopup";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// TODO:
// 1. Diff stats for diff categories

const ItemDetail = (props) => {
  const [isAddStock, setAddStock] = useState(false);
  const [isAddGrocery, setAddGrocery] = useState(false);
  const [isEditItemName, setEditItemName] = useState(false);
  const [isOpenUsageHistory, setOpenUsageHistory] = useState(false);

  const item = props.item;

  const purchases = item.purchases.sort((a, b) => {
    let da = new Date(a.purchaseDate),
      db = new Date(b.purchaseDate);
    return da - db;
  });

  const checkoutRecord = item.checkoutRecords.sort((a, b) => {
    let da = new Date(a.checkoutDate),
      db = new Date(b.checkoutDate);
    return db - da;
  });

  console.log(checkoutRecord);
  const navigate = useNavigate();

  const handleCloseGrocery = () => {
    setAddGrocery(false);
  };

  useEffect(() => {
    if (isAddGrocery === true) {
      const timer = setTimeout(() => {
        setAddGrocery(false);
      }, 1200);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAddGrocery]);

  const avgPrice = () => {
    let totalAmount = 0;
    let totalCount = 0;
    purchases.forEach((purchaseDetail) => {
      if (purchaseDetail.price !== 0) {
        totalAmount += purchaseDetail.price;
        totalCount += 1;
      }
    });
    let avgPrice = totalAmount / totalCount;
    return avgPrice.toFixed(2);
  };

  const lastCheckoutDtAndUsageDays = () => {
    let lastCheckoutDate;
    let prevCheckoutDate;
    let usageDays = 0;
    checkoutRecord.forEach((checkout) => {
      // to calculate usageDays
      let ckDate = new Date(checkout.checkoutDate);
      if (checkoutRecord.length === 1) {
        usageDays = Math.ceil(
          (ckDate - new Date(checkout.purchaseDate)) / (1000 * 60 * 60 * 24)
        );
      } else if (prevCheckoutDate !== undefined) {
        usageDays += Math.ceil(
          (prevCheckoutDate - ckDate) / (1000 * 60 * 60 * 24)
        );
      }
      prevCheckoutDate = ckDate;

      // to calculate the last checkout date
      if (lastCheckoutDate === undefined) {
        lastCheckoutDate = ckDate;
      } else if (ckDate > lastCheckoutDate) {
        lastCheckoutDate = ckDate;
      }
    });

    usageDays =
      checkoutRecord.length === 0
        ? "-"
        : Math.ceil(usageDays / checkoutRecord.length);
    return [DATE_FORMATTER(lastCheckoutDate), usageDays];
  };

  const [lastCheckoutDt, avgUsageTime] = lastCheckoutDtAndUsageDays();

  const stockRuntimeDate = () => {
    if (avgUsageTime === "-") return "-";
    const stockRuntime = avgUsageTime * item.totalQuantity;
    let ckDate = new Date(lastCheckoutDt);
    let runtimeDate = new Date(ckDate.setDate(ckDate.getDate() + stockRuntime));
    return DATE_FORMATTER(runtimeDate);
  };

  const statistics = () => {
    const arr = [];
    const statValue = [
      lastCheckoutDt,
      stockRuntimeDate(),
      avgUsageTime,
      avgPrice(),
    ];
    for (let i = 0; i < STATISTICS_LABEL.length; i++) {
      arr.push(STATISTICS_LABEL[i] + statValue[i]);
    }
    return arr;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      border="solid"
      borderRadius={6}
      mt={2}
    >
      <Box
        display="flex"
        alignItems="center"
        width="6vw"
        ml={4}
        mt={2}
        onClick={() => {
          navigate("/inventory");
        }}
        css={css`
          cursor: pointer;
        `}
      >
        <ArrowBackIcon />
        {"\u00A0"}Back
      </Box>

      {/* ~~~~~~~~~~ START of HEADER section ~~~~~~~~~~*/}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        height="8vh"
        pl={2}
        pr={2}
        pb={1}
      >
        <Box width="80%" display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row">
            <Box fontSize="2rem" mr={2}>
              {item.itemName}
            </Box>
            <EditOutlinedIcon
              fontSize="large"
              css={css`
                cursor: pointer;
              `}
              onClick={() => {
                setEditItemName(true);
              }}
            />
            <EditItemDetailPopup
              isOpen={isEditItemName}
              setOpen={setEditItemName}
              getItemDetail={props.getItemDetail}
              item={item}
            />
          </Box>
          <Box>({item.categoryName})</Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
          width="20%"
        >
          <Box fontSize="1.3rem">Total Quantity: {item.totalQuantity}</Box>
          <AddGroceryButton item={item} setAddGrocery={setAddGrocery} />
          <AddedToGroceryListPopup
            isAddGrocery={isAddGrocery}
            handleCloseGrocery={handleCloseGrocery}
          />
        </Box>
      </Box>
      <Divider variant="middle" />

      {/* ~~~~~~~~~~ END of HEADER section ~~~~~~~~~~*/}

      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          width="70%"
        >
          {/* ~~~~~~~~~~ START of PURCHASES section ~~~~~~~~~~*/}
          <Box display="flex" flexDirection="column" maxHeight="55vh">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              pl={2}
              pr={2}
              pt={2}
            >
              <Box fontSize="1.3rem" fontWeight={500}>
                Purchase Dates
              </Box>
              <Box pr={1}>
                <AddCircleIcon
                  css={css`
                    cursor: pointer;
                  `}
                  onClick={() => {
                    setAddStock(true);
                  }}
                />
                <AddStockPopup
                  isAddStock={isAddStock}
                  setAddStock={setAddStock}
                  getItemDetail={props.getItemDetail}
                  item={item}
                />
              </Box>
            </Box>
            <Box sx={{ maxHeight: "100%", overflow: "auto" }}>
              {purchases.map((purchaseDetail) => {
                return (
                  <Box
                    key={purchaseDetail.purchaseNo}
                    display={
                      purchaseDetail.remainingQuantity === 0 ? "none" : ""
                    }
                  >
                    <PurchaseDetail
                      purchaseDetail={purchaseDetail}
                      getItemDetail={props.getItemDetail}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* ~~~~~~~~~~ END of PURCHASES section ~~~~~~~~~~*/}

          {/* ~~~~~~~~~~ START of STATS section ~~~~~~~~~~*/}
          <Divider />

          <Box display="flex" flexDirection="column">
            <Box pl={2} pb={1} pt={1} fontSize="1.3rem" fontWeight={500}>
              Statistics
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              pl={2}
              pb={2}
            >
              {statistics().map((stat) => {
                return (
                  <Box key={stat} display="flex" pb={1} width="30vw">
                    {stat}
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* ~~~~~~~~~~ END of STATS section ~~~~~~~~~~*/}
        </Box>

        <Box
          display="flex"
          width="30%"
          flexDirection="column"
          justifyContent="space-between"
        >
          {/* ~~~~~~~~~~ START of ALERT section ~~~~~~~~~~*/}

          <Alert alert={item.alert} fontAdjustment={0.2} />

          {/* ~~~~~~~~~~ END of ALERT section ~~~~~~~~~~*/}

          {/* ~~~~~~~~~~ START of PRICE HISTORY and USAGE HISTORY section ~~~~~~~~~~*/}
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box p={2}>
              <PriceHistoryButton />
            </Box>
            <Box p={2}>
              <UsageHistoryButton setOpen={setOpenUsageHistory} />
              <UsageHistoryPopup
                isOpen={isOpenUsageHistory}
                setOpen={setOpenUsageHistory}
                getItemDetail={props.getItemDetail}
                item={item}
              />
            </Box>
          </Box>
          {/* ~~~~~~~~~~ END of PRICE HISTORY and USAGE HISTORY section ~~~~~~~~~~*/}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetail;
