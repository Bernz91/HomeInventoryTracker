import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

const AddedToGroceryListPopup = (props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.isAddGrocery}
      onClick={props.handleCloseGrocery}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
        borderRadius={2}
        color="black"
        opacity={0.5}
        height="8vh"
        width="20vw"
      >
        Added to Grocery List
      </Box>
    </Backdrop>
  );
};

export default AddedToGroceryListPopup;
