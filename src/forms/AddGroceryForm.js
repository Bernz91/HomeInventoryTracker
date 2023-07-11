import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../Constant";
import axios from "axios";
import { SAMPLE_USER } from "../SampleData";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ErrorHandler from "../components/ErrorHandler";
import { useUserContext } from "../context/UserContext";

const AddGroceryForm = (props) => {
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
      data.itemNo = 0;
      console.log(data);
      setData(data);
    }
  };

  const postGrocery = async () => {
    if (data === undefined) return;
    try {
      await axios({
        method: "POST",
        url: `${BACKEND_URL}/grocery`,
        data: data,
      });
      props.getGrocery();
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
      console.log(data);
      setLoading(true);
      postGrocery();
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
                defaultValue={1}
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

export default AddGroceryForm;
