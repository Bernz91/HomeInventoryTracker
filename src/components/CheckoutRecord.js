import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { BACKEND_URL } from "../Constant";
import { DATE_FORMATTER } from "../helperFunctions/HelperFunctions";
import ErrorHandler from "./ErrorHandler";

const CheckoutRecord = (props) => {
  const checkout = props.checkout;

  const deleteRecord = async () => {
    try {
      await axios({
        method: "DELETE",
        url: `${BACKEND_URL}/checkout/${checkout.checkoutNo}`,
      });
      // props.setLoading(true);
      props.getCheckoutRecords();
    } catch (err) {
      alert(ErrorHandler(err.response.data));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      mt={1}
      mb={1}
    >
      <Box width="30%" display="flex" justifyContent="center">
        {DATE_FORMATTER(new Date(checkout.checkoutDate))}
      </Box>
      <Box width="30%" display="flex" justifyContent="center">
        {DATE_FORMATTER(new Date(checkout.purchaseDate))}
      </Box>
      <Box width="30%" display="flex" justifyContent="center">
        {checkout.quantity}
      </Box>

      <Box width="10%" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          color="error"
          sx={{ height: "4vh" }}
          onClick={deleteRecord}
        >
          DELETE
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutRecord;
