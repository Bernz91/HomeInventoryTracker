import { useState } from "react";
import Box from "@mui/material/Box";
import CheckoutButton from "./buttons/CheckoutButton";
import CheckoutPopup from "../popups/CheckoutPopup";
import { DATE_FORMATTER } from "../helperFunctions/HelperFunctions";
import EditButton from "./buttons/EditButton";
import EditPurchasePopup from "../popups/EditPurchasePopup";

const PurchaseDetail = (props) => {
  const [isCheckout, setCheckout] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const purchase = props.purchaseDetail;

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      height="6vh"
      border="solid"
      borderColor="black"
      borderRadius={2}
      p={2}
      mb={1}
      ml={2}
      mr={2}
    >
      <Box display="flex" flexDirection="column" width="100%" mr={1}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box fontSize="1.2rem">
            {DATE_FORMATTER(new Date(purchase.purchaseDate))}
          </Box>
          <Box>
            Quantity: {purchase.remainingQuantity} out of{" "}
            {purchase.originalQuantity}
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box width="30%">
            Exp Dt:{" "}
            {purchase.expiryDate === null
              ? "-"
              : DATE_FORMATTER(new Date(purchase.expiryDate))}
          </Box>
          <Box>
            From:{" "}
            {purchase.purchasedFrom === null ? "-" : purchase.purchasedFrom}
          </Box>

          <Box display="flex" justifyContent="right" width="30%">
            Price: ${purchase.price === 0 ? "-" : purchase.price} / item
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box p={1}>
          <CheckoutButton setOpen={setCheckout} />
          <CheckoutPopup
            isOpen={isCheckout}
            setOpen={setCheckout}
            purchase={purchase}
            getItemDetail={props.getItemDetail}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <EditButton setOpen={setEdit} />
          <EditPurchasePopup
            isOpen={isEdit}
            setOpen={setEdit}
            purchase={purchase}
            getItemDetail={props.getItemDetail}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default PurchaseDetail;
