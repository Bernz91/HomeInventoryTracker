import { Box } from "@mui/system";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const DismissButton = () => {
  const handleClick = (e) => {};
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="black"
      color="white"
      fontSize="0.8em"
      borderRadius={2}
      width="4vw"
      height="4vh"
      css={css`
        cursor: pointer;
      `}
      onClick={(e) => {
        handleClick(e);
      }}
    >
      Dismiss
    </Box>
  );
};

export default DismissButton;
