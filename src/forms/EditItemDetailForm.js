import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../Constant";
import axios from "axios";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useCategoryContext } from "../context/CategoryContext";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ErrorHandler from "../components/ErrorHandler";

// TO DO
// 1. add whether the price is per item or total

const EditItemDetailForm = (props) => {
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
    data.itemNo = props.item.itemNo;
    if (temp !== undefined) {
      setData(temp);
    }
  };

  const putItem = async () => {
    try {
      await axios({
        method: "PUT",
        url: `${BACKEND_URL}/item`,
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
      putItem();
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
                  defaultValue={props.item.categoryName}
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
        </Box>
      </form>
    </>
  );
};

export default EditItemDetailForm;
