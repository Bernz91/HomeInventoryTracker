import { Box } from "@mui/system";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const PriceHistoryButton = () => {
  const handleClick = (e) => {};
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="black"
      color="white"
      fontSize="1rem"
      borderRadius={2}
      width="10vw"
      height="8vh"
      css={css`
        cursor: pointer;
      `}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      Price History
    </Box>
  );
};

export default PriceHistoryButton;
