import { useState } from "react";
import axios from "axios";

//MUI imports
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

//Component imports
import CheckoutRecord from "../components/CheckoutRecord";
import ErrorHandler from "../components/ErrorHandler";

//Helpers and constant importws
import { BACKEND_URL, MODAL_STYLE } from "../Constant";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const UsageHistoryPopup = (props) => {
  const passedCheckoutRecord = props.item.checkoutRecords.sort((a, b) => {
    let da = new Date(a.checkoutDate),
      db = new Date(b.checkoutDate);
    return db - da;
  });
  const [checkoutRecords, setCheckoutRecords] = useState();
  const handleModalClose = () => {
    setCheckoutRecords(undefined);
    props.setOpen(false);
    props.getItemDetail();
  };

  const getCheckoutRecords = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${BACKEND_URL}/checkout/${props.item.itemNo}`,
      });
      setCheckoutRecords(
        res.data.sort((a, b) => {
          let da = new Date(a.checkoutDate),
            db = new Date(b.checkoutDate);
          return db - da;
        })
      );
    } catch (err) {
      alert(ErrorHandler(err.response.data));
    }
  };

  return (
    <Modal open={props.isOpen} onClose={handleModalClose}>
      <Box sx={MODAL_STYLE} display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box fontSize="2rem" p={1}>
            Usage History
          </Box>
          <Box pr={2}>
            <CloseIcon
              onClick={handleModalClose}
              css={css`
                cursor: pointer;
              `}
            />
          </Box>
        </Box>
        {/* ~~~~~~~~~~ START of CHECK OUT section ~~~~~~~~~~*/}
        <Box display="flex" flexDirection="column">
          <Box p={2} fontSize="1.3rem" fontWeight={500} width="60vw">
            Check Out Records
          </Box>
          {(checkoutRecords === undefined
            ? passedCheckoutRecord
            : checkoutRecords
          ).length === 0 ? (
            <Box pl={2} pb={1} pt={1}>
              -
            </Box>
          ) : (
            <Box ml={2} mr={2} p={0.5}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box width="30%" display="flex" justifyContent="center">
                  Check Out date
                </Box>
                <Box width="30%" display="flex" justifyContent="center">
                  Purchased Date
                </Box>
                <Box width="30%" display="flex" justifyContent="center">
                  Quantity
                </Box>
                <Box width="10%"></Box>
              </Box>
              <Divider />
              <Box sx={{ maxHeight: "50vh", overflow: "auto" }}>
                {(checkoutRecords === undefined
                  ? passedCheckoutRecord
                  : checkoutRecords
                ).map((checkout) => {
                  return (
                    <Box key={checkout.checkoutNo}>
                      <CheckoutRecord
                        checkout={checkout}
                        getCheckoutRecords={getCheckoutRecords}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>

        {/* ~~~~~~~~~~ END of CHECK OUT section ~~~~~~~~~~*/}
      </Box>
    </Modal>
  );
};

export default UsageHistoryPopup;
