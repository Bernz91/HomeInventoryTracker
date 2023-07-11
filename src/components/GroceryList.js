import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import GroceryItem from "./GroceryItem";

const GroceryList = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      mt={2}
      height="70vh"
      width="75vw"
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            width="8vw"
          ></Box>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="40vw"
          >
            <Box>Item Name</Box>
            <Box display="flex" justifyContent="center" width="10vw">
              Quantity
            </Box>
          </Box>
          {/* <Box display="flex" width="10vw" justifyContent="center">
            Delete
          </Box> */}
        </Box>
      </Box>

      <Divider variant="middle" />
      <Box
        display="flex"
        flexDirection="column"
        // flexWrap="wrap"
        justifyContent="space-between"
        sx={{ maxHeight: "100%", overflow: "auto" }}
      >
        {props.selectedItem === undefined ? (
          props.groceryList.map((grocery) => {
            return (
              <Box key={grocery.itemName}>
                <GroceryItem
                  grocery={grocery}
                  handleSort={props.handleSort}
                  getGrocery={props.getGrocery}
                  categories={props.categories}
                />
              </Box>
            );
          })
        ) : (
          <GroceryItem grocery={props.selectedItem} />
        )}
      </Box>
    </Box>
  );
};

export default GroceryList;
