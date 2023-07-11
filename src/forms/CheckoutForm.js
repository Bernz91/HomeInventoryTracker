import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { BACKEND_URL } from "../Constant";
import ErrorHandler from "../components/ErrorHandler";
import { useUserContext } from "../context/UserContext";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CheckoutForm = (props) => {
  const { user } = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data !== undefined) {
      data.userId = user.userID;
      data.purchaseNo = props.purchase.purchaseNo;
      setData(data);
    }
  };

  const postCheckout = async () => {
    try {
      await axios({
        method: "POST",
        url: `${BACKEND_URL}/checkout`,
        data: data,
      });
      props.getItemDetail();
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
      postCheckout();
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
              Purchased Date
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="left"
              height="5vh"
              width="30vw"
            >
              {props.purchase.purchaseDate}
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
              <label>
                Check Out Date<sup>*</sup>
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
                id="checkoutDate"
                defaultValue={new Date().toISOString().split("T")[0]}
                {...register("checkoutDate", {
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
            {errors?.checkoutDate && (
              <Box
                display="flex"
                justifyContent="left"
                color="red"
                fontSize={10}
                width="30vw"
              >
                {errors?.checkoutDate?.message}
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
                max={props.purchase.remainingQuantity}
                defaultValue={1}
                {...register("quantity", {
                  required: "Field is required",
                  valueAsNumber: true,
                  min: 1,
                  max: props.purchase.remainingQuantity,
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

export default CheckoutForm;
