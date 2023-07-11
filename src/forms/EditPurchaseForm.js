import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../Constant";
import axios from "axios";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useUserContext } from "../context/UserContext";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ErrorHandler from "../components/ErrorHandler";

// TO DO
// 1. add whether the price is per item or total

const EditPurchaseForm = (props) => {
  const { user } = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const temp = data;
    temp.userId = user.userID;
    temp.purchaseNo = props.purchase.purchaseNo;
    if (temp !== undefined) {
      setData(temp);
    }
  };

  const putPurchase = async () => {
    try {
      await axios({
        method: "PUT",
        url: `${BACKEND_URL}/item/purchase`,
        data: data,
      });
      if (props.getItemDetail !== undefined) {
        props.getItemDetail();
      }
      setLoading(false);
      setData(undefined);
      props.setOpen(false);
    } catch (err) {
      setLoading(false);
      alert(ErrorHandler(err.response.data));
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      setLoading(true);
      putPurchase();
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
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column">
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
                defaultValue={props.purchase.purchaseDate}
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
                defaultValue={props.purchase.expiryDate}
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
                Quantity at Purchase<sup>*</sup>
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
                id="originalQuantity"
                type="number"
                min={
                  props.purchase.originalQuantity -
                  props.purchase.remainingQuantity
                }
                defaultValue={props.purchase.originalQuantity}
                {...register("originalQuantity", {
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
            {errors?.originalQuantity && (
              <Box
                display="flex"
                justifyContent="left"
                color="red"
                fontSize={10}
                width="30vw"
              >
                {errors?.originalQuantity?.message}
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
                defaultValue={props.purchase.price}
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
                defaultValue={props.purchase.purchasedFrom}
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
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box display="flex" justifyContent="center" pt={3}>
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

export default EditPurchaseForm;
