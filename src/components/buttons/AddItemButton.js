import { Box } from "@mui/system";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const AddItemButton = (props) => {
  const handleClick = () => {
    props.setAddItem(true);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="black"
      fontSize="1.2rem"
      color="white"
      height="6vh"
      borderRadius={2}
      pl={4}
      pt={1}
      pb={1}
      mt={2}
      css={css`
        cursor: pointer;
      `}
      onClick={handleClick}
    >
      + Add Item
    </Box>
  );
};

export default AddItemButton;
