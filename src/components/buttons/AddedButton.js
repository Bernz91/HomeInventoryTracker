import Box from "@mui/material/Box";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const AddToInventoryButton = (props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray"
      color="white"
      width="10vw"
      height="4vh"
      borderRadius={1}
      opacity={0.5}
      sx={{
        fontSize: {
          xs: "10px",
          sm: "12px",
          lg: "16px",
        },
      }}
    >
      Added
    </Box>
  );
};

export default AddToInventoryButton;
