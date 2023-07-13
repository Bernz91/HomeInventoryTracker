import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

import AddGroceryButton from "./buttons/AddGroceryButton";
import AddStockButton from "./buttons/AddStockButton";
import AddStockPopup from "../popups/AddStockPopup";
import AddedToGroceryListPopup from "../popups/AddedToGroceryListPopup";
import TickedButton from "./buttons/TickedButton";

import { Box } from "@mui/system";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const InventoryList = (props) => {
  const [cookies] = useCookies(["userCookie"]);
  const [isAddStock, setAddStock] = useState(false);
  const [isAddGrocery, setAddGrocery] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/item", { state: { itemNo: props.item.itemNo } });
  };

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

  return (
    <Box
      display="flex"
      flexDirection="row"
      height="5vh"
      backgroundColor={props.item.totalQuantity === 0 ? "silver" : ""}
      border="solid"
      borderRadius={2}
      p={1}
      m={1}
      sx={{
        width: {
          xs: "82vw",
          sm: "89vw",
          md: "44vw",
          lg: "45vw",
          // xl: 500,
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        sx={{
          fontSize: {
            xs: "12px",
            sm: "16px",
            lg: "18px",
          },
        }}
        css={css`
          cursor: pointer;
        `}
        onClick={handleClick}
      >
        <Box>{props.item.itemName}</Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box display="flex" justifyContent="right">
            Quantity:{"\u00A0"}
          </Box>
          <Box display="flex" justifyContent="left" width="2.5vw">
            {props.item.totalQuantity}
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box pl={1}>
          <AddStockButton setAddStock={setAddStock} />
          <AddStockPopup
            isAddStock={isAddStock}
            setAddStock={setAddStock}
            item={props.item}
            getInventory={props.getInventory}
          />
        </Box>
        <Box pl={1}>
          {isAddGrocery ? (
            <TickedButton />
          ) : (
            <AddGroceryButton
              item={props.item}
              setAddGrocery={setAddGrocery}
              user={cookies.userCookie}
            />
          )}
          {/* <AddedToGroceryListPopup
            isAddGrocery={isAddGrocery}
            handleCloseGrocery={handleCloseGrocery}
          /> */}
        </Box>
      </Box>
      {/* <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          fontSize="16px"
        >
          <Box pt={0.5} pb={0.5}>
            Last Checkout Date: YYYY-MM-DD
          </Box>
          <Box pt={0.5} pb={0.5}>
            Average Usage Time: 35 days
          </Box>
        </Box>
        <Box display="flex" flexDirection="row">
          <Box pl={1}>
            <AddStockButton item={props.item} />
          </Box>
          <Box pl={1}>
            <AddGroceryButton />
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
};

export default InventoryList;
