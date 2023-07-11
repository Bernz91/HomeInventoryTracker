import Box from "@mui/material/Box";
import AddedButton from "./buttons/AddedButton";
import AddButton from "./buttons/AddButton";
import ReduceButton from "./buttons/ReduceButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Constant";
import axios from "axios";
import ErrorHandler from "./ErrorHandler";
import AddToInventoryButton from "./buttons/AddToInventoryButton";
import AddItemPopup from "../popups/AddItemPopup";
import AddStockPopup from "../popups/AddStockPopup";
import { useUserContext } from "../context/UserContext";

// TO DO:
// 1. to change the quantity by input (if possible)
// 2. When the quantity is zero, change the minus icon to delete.

const GroceryItem = (props) => {
  const grocery = props.grocery;
  const { user } = useUserContext();
  const [isTicked, setTicked] = useState(grocery.ticked);
  const [quantity, setQuantity] = useState(grocery.quantity);
  const [isAddStock, setAddStock] = useState(false);
  const [isAddItem, setAddItem] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  // const [isEditingQuantity, setEditingQuantity] = useState(false);
  const [data, setData] = useState();

  const handleAdd = () => {
    setQuantity(quantity + 1);
    grocery.quantity += 1;
    setData(grocery);
  };

  const handleReduce = () => {
    if (grocery.quantity > 0) {
      setQuantity(quantity - 1);
      grocery.quantity -= 1;
      setData(grocery);
    }
  };

  // const handleChange = (e) => {
  //   console.log(e);
  // };

  // const handleEditQuantity = () => {
  //   console.log("editing");
  //   setEditingQuantity((prevState) => !prevState);
  // };

  // const handleClickAway = () => {
  //   console.log("clicked away");
  //   setEditingQuantity(false);
  // };

  const handleQuantityChange = (e) => {
    // setEditingQuantity(false);
    if (grocery.quantity != e.target.value) {
      setQuantity(e.target.value);
      grocery.quantity = e.target.value;
      setData(grocery);
    }
  };

  const handleTickChange = () => {
    if (isTicked) {
      setTicked(false);
      grocery.ticked = false;
      setData(grocery);
    } else {
      setTicked(true);
      grocery.ticked = true;
      setData(grocery);
    }
  };

  const handleAddToInventoryButtonClick = () => {
    if (grocery.itemNo === 0) {
      setAddItem(true);
    } else setAddStock(true);
  };

  const putGrocery = async () => {
    try {
      await axios({
        method: "PUT",
        url: `${BACKEND_URL}/grocery`,
        data: data,
      });
      setData(undefined);
    } catch (err) {
      alert(ErrorHandler(err.response.data));
    }
  };

  const deleteGrocery = async () => {
    if (grocery.itemNo === 0) {
      try {
        await axios({
          method: "DELETE",
          url: `${BACKEND_URL}/grocery/new/${user.userID}?itemName=${grocery.itemName}`,
        });
        props.getGrocery();
      } catch (err) {
        alert(ErrorHandler(err.repsonse.data));
      }
    } else {
      try {
        await axios({
          method: "DELETE",
          url: `${BACKEND_URL}/grocery/existing/${grocery.itemNo}`,
        });
        props.getGrocery();
      } catch (err) {
        alert(ErrorHandler(err.repsonse.data));
      }
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      putGrocery();
    }
  }, [data]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     props.handleSort();
  //   }, 3000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [isTicked]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisabled(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [isDisabled]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      height="4vh"
      mt={0.5}
      mb={0.5}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        width="8vw"
      >
        <input type="checkbox" checked={isTicked} onChange={handleTickChange} />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        width="40vw"
      >
        <Box>{grocery.itemName}</Box>
        <Box
          display="flex"
          flexDirection="row"
          width="10vw"
          justifyContent="space-between"
        >
          <ReduceButton handleClick={handleReduce} />
          <Box display="flex" width="5vw">
            {/* {isEditingQuantity ? ( */}
            <TextField
              value={quantity}
              size="small"
              inputProps={{
                style: {
                  fontSize: "0.85rem",
                  height: "1vh",
                  textAlign: "center",
                  justifyContent: "space-between",
                },
              }}
              onBlur={(e) => handleQuantityChange(e)}
            />
            {/* ) : ( */}
            {/* <Box
              display="flex"
              alignItems="center"
              fontSize="0.85rem"
              justifyContent="center"
              height="3vh"
              width="100%"
              border="1px solid"
              borderRadius={1}
              // onClick={handleEditQuantity}
            >
              {quantity}
            </Box> */}
            {/* )} */}
          </Box>
          <AddButton handleClick={handleAdd} />
        </Box>
      </Box>
      <Box display="flex" width="20vw" justifyContent="space-around" pl={2}>
        {isDisabled ? (
          <AddedButton />
        ) : (
          <AddToInventoryButton handleClick={handleAddToInventoryButtonClick} />
        )}
        <AddItemPopup
          isAddItem={isAddItem}
          setAddItem={setAddItem}
          setDisabled={setDisabled}
          item={grocery}
          deleteGrocery={deleteGrocery}
        />
        <AddStockPopup
          isAddStock={isAddStock}
          setAddStock={setAddStock}
          item={grocery}
          setDisabled={setDisabled}
          deleteGrocery={deleteGrocery}
        />
        <Button
          variant="outlined"
          color="error"
          sx={{ height: "4vh" }}
          onClick={deleteGrocery}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
};

export default GroceryItem;
