import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Alert from "../components/Alert";
import { BACKEND_URL } from "../Constant";
import { useCategoryContext } from "../context/CategoryContext";
import ErrorHandler from "../components/ErrorHandler";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// TO DO
// 1. add whether the price is per item or total

const AddItemForm = (props) => {
  const [cookies] = useCookies(["userCookie"]);
  const [isLoading, setLoading] = useState(false);
  const { categories } = useCategoryContext();
  const [data, setData] = useState();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const temp = data;
    temp.userId = cookies.userCookie.userID;
    temp.lowInventoryAlert = false;
    temp.inventoryThreshold = 0;
    temp.expiryDateAlert = false;
    temp.daysBeforeExpiryDate = 0;

    if (temp !== undefined) {
      setData(temp);
    }
  };

  const postItem = async () => {
    try {
      await axios({
        method: "POST",
        url: `${BACKEND_URL}/item`,
        data: data,
      });
      if (props.deleteGrocery !== undefined) {
        props.deleteGrocery();
      }
      if (props.getInventory !== undefined) {
        props.getInventory();
      }
      setLoading(false);
      setData(undefined);
      props.setAddItem(false);
      if (props.setDisabled !== undefined) {
        props.setDisabled(true);
      }
    } catch (err) {
      setLoading(false);
      alert(ErrorHandler(err.response.data));
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      setLoading(true);
      postItem();
    }
  }, [data]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="45vw"
              mt={1}
            >
              <Box display="flex" alignItems="center" height="5vh">
                <label htmlFor="categoryName">
                  Category<sup>*</sup>
                </label>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderRadius={1}
                height="5vh"
                width="30vw"
              >
                <select
                  id="categoryName"
                  {...register("categoryName", {
                    required: "^Field is required",
                  })}
                  css={css`
                    outline: none;
                    border: none;
                    width: 29vw;
                    height: 4vh;
                  `}
                >
                  <option value="" hidden>
                    Categories
                  </option>
                  {categories.map((category) => {
                    return (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box></Box>
              {errors?.categoryName && (
                <Box
                  display="flex"
                  justifyContent="left"
                  color="red"
                  fontSize={10}
                  width="30vw"
                >
                  {errors?.categoryName?.message}
                </Box>
              )}
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="45vw"
              mt={1}
            >
              <Box display="flex" alignItems="center" height="5vh">
                <label htmlFor="itemName">
                  Item Name<sup>*</sup>
                </label>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderRadius={1}
                height="5vh"
                width="30vw"
              >
                <input
                  id="itemName"
                  defaultValue={
                    props.item !== undefined ? props.item.itemName : ""
                  }
                  {...register("itemName", {
                    required: "^Field is required",
                    maxLength: 30,
                  })}
                  css={css`
                    outline: none;
                    border: none;
                    width: 29vw;
                    height: 4vh;
                  `}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box></Box>
              {errors?.itemName && (
                <Box
                  display="flex"
                  justifyContent="left"
                  color="red"
                  fontSize={10}
                  width="30vw"
                >
                  {errors?.itemName?.message}
                </Box>
              )}
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="45vw"
              mt={1}
            >
              <Box display="flex" alignItems="center" height="5vh">
                <label>
                  Purchase Date<sup>*</sup>
                </label>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                height="5vh"
                width="30vw"
                borderRadius={1}
              >
                <input
                  type="date"
                  id="purchaseDate"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  {...register("purchaseDate", {
                    required: "^Field is required",
                  })}
                  css={css`
                    outline: none;
                    border: none;
                    width: 29vw;
                    height: 4vh;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
                      "Droid Sans", "Helvetica Neue", sans-serif;
                  `}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box></Box>
              {errors?.purchaseDate && (
                <Box
                  display="flex"
                  justifyContent="left"
                  color="red"
                  fontSize={10}
                  width="30vw"
                >
                  {errors?.purchaseDate?.message}
                </Box>
              )}
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="45vw"
              mt={1}
            >
              <Box display="flex" alignItems="center">
                <label>Expiry Date</label>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderRadius={1}
                height="5vh"
                width="30vw"
              >
                <input
                  type="date"
                  id="expiryDate"
                  {...register("expiryDate")}
                  css={css`
                    outline: none;
                    border: none;
                    width: 29vw;
                    height: 4vh;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
                      "Droid Sans", "Helvetica Neue", sans-serif;
                  `}
                />
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="45vw"
              mt={1}
            >
              <Box display="flex" alignItems="center" height="5vh">
                <label htmlFor="quantity">
                  Quantity<sup>*</sup>
                </label>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderRadius={1}
                height="5vh"
                width="30vw"
              >
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  defaultValue={
                    props.item !== undefined ? props.item.quantity : 1
                  }
                  {...register("quantity", {
                    required: "Field is required",
                    valueAsNumber: true,
                    min: 1,
                  })}
                  css={css`
                    outline: none;
                    border: none;
                    width: 29vw;
                    height: 4vh;
                  `}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box></Box>
              {errors?.quantity && (
                <Box
                  display="flex"
                  justifyContent="left"
                  color="red"
                  fontSize={10}
                  width="30vw"
                >
                  {errors?.quantity?.message}
                </Box>
              )}
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="45vw"
              mt={1}
            >
              <Box display="flex" alignItems="center">
                <label htmlFor="price">Price</label>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderRadius={1}
                height="5vh"
                width="30vw"
              >
                <input
                  id="price"
                  defaultValue={0}
                  pattern="^\d{1,10}(\.\d{0,2})?$"
                  {...register("price", {
                    pattern: {
                      value: /^\d{1,10}(\.\d{0,2})?$/,
                      message: "Please enter a number above 0, up to 2dp.",
                    },
                    valueAsNumber: true,
                  })}
                  css={css`
                    outline: none;
                    border: none;
                    width: 29vw;
                    height: 4vh;
                  `}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box></Box>
              {errors?.price && (
                <Box
                  display="flex"
                  justifyContent="left"
                  color="red"
                  fontSize={10}
                  width="30vw"
                >
                  {errors?.price?.message}
                </Box>
              )}
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="45vw"
              mt={1}
            >
              <Box display="flex" alignItems="center">
                <label htmlFor="purchasedFrom">Purchased From</label>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderRadius={1}
                height="5vh"
                width="30vw"
              >
                <input
                  id="purchasedFrom"
                  {...register("purchasedFrom", { maxLength: 20 })}
                  css={css`
                    outline: none;
                    border: none;
                    width: 29vw;
                    height: 4vh;
                  `}
                />
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="45vw"
            >
              <Box></Box>
              <Box
                display="flex"
                justifyContent="left"
                fontSize={12}
                width="30vw"
              >
                <sup>*</sup>Required field
              </Box>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box>
              <Alert fontAdjustment={0} />
            </Box>
            <Box display="flex" justifyContent="center" pl={4} pb={2}>
              <input
                type="submit"
                css={css`
                  color: white;
                  font-size: 1rem;
                  background-color: #000000;
                  outline: none;
                  border: none;
                  border-radius: 10px;
                  width: 20vw;
                  height: 10vh;
                  cursor: pointer;
                `}
              />
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AddItemForm;
