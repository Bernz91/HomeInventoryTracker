import { Box } from "@mui/system";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const UsageHistoryButton = (props) => {
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
      fontSize="1em"
      borderRadius={2}
      width="10vw"
      height="8vh"
      css={css`
        cursor: pointer;
      `}
      onClick={handleClick}
    >
      Usage History
    </Box>
  );
};

export default UsageHistoryButton;
