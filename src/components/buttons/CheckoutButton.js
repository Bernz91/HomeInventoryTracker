import { Box } from "@mui/system";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CheckoutButton = (props) => {
  const handleClick = () => {
    props.setOpen(true);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="black"
      color="white"
      fontSize="0.8em"
      borderRadius={2}
      width="8vw"
      height="5vh"
      css={css`
        cursor: pointer;
      `}
      onClick={handleClick}
    >
      Checkout
    </Box>
  );
};

export default CheckoutButton;
