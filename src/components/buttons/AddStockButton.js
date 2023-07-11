import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const AddStockButton = (props) => {
  const handleClick = () => {
    props.setAddStock(true);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      bgcolor="black"
      borderRadius={2}
      width="4vw"
      height="4vh"
      css={css`
        cursor: pointer;
      `}
      onClick={handleClick}
    >
      <AddIcon fontSize="18px" />
    </Box>
  );
};

export default AddStockButton;
