import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import axios from "axios";

import Box from "@mui/material/Box";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { BACKEND_URL } from "../Constant";
import ErrorHandler from "../components/ErrorHandler";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const RegisterForm = (props) => {
  const [cookies, setCookie] = useCookies(["userCookie"]);
  const [data, setData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data !== undefined) {
      setData(data);
    }
  };

  const postUser = async () => {
    try {
      await axios({
        method: "POST",
        url: `${BACKEND_URL}/user`,
        data: data,
      }).then(() => {
        axios({
          method: "GET",
          url: `${BACKEND_URL}/user?email=${data.email}`,
        }).then((res) => {
          setCookie("userCookie", res.data);
          setData(undefined);
          props.setRegister(false);
        });
      });
    } catch (err) {
      alert(ErrorHandler(err.response.data));
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      postUser();
    }
  }, [data]);

  return (
    <Box>
      <ArrowBackIosIcon
        fontSize="10px"
        css={css`
          cursor: pointer;
        `}
        onClick={() => props.setRegister(false)}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            width="40vw"
            mt={1}
            mr={3}
            ml={3}
          >
            <Box display="flex" alignItems="center" height="5vh">
              <label htmlFor="email">Email Address</label>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="1px solid"
              borderRadius={1}
              height="5vh"
            >
              <input
                id="email"
                {...register("email", {
                  required: "^Field is required",
                  maxLength: 30,
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                css={css`
                  outline: none;
                  border: none;
                  width: 39vw;
                  height: 4vh;
                `}
              />
            </Box>
          </Box>
          <Box display="flex" pl={3}>
            {errors?.email && (
              <Box
                display="flex"
                justifyContent="left"
                color="red"
                fontSize={10}
                width="30vw"
              >
                {errors?.email?.message}
              </Box>
            )}
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box display="flex" justifyContent="center" pt={3}>
              <input
                value="Register"
                type="submit"
                css={css`
                  color: white;
                  font-size: 1rem;
                  background-color: #000000;
                  outline: none;
                  border: none;
                  border-radius: 20px;
                  width: 30vw;
                  height: 8vh;
                  cursor: pointer;
                `}
              />
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterForm;
