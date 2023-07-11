import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const AddButton = (props) => {
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
      <AddIcon fontSize="18px" />
    </Box>
  );
};

export default AddButton;
