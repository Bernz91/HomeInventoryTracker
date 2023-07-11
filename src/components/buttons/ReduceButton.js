import { Box } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const ReduceButton = (props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      bgcolor="black"
      borderRadius={2}
      width="2vw"
      height="3.5vh"
      css={css`
        cursor: pointer;
      `}
      onClick={props.handleClick}
    >
      <RemoveIcon fontSize="18px" />
    </Box>
  );
};

export default ReduceButton;
