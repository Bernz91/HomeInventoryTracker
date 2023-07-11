import Box from "@mui/material/Box";
import LoginForm from "../forms/LoginForm";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Login = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box mb={4}>
        <Box display="flex" fontSize="3rem" p={2} justifyContent="left">
          Welcome Back.
        </Box>
        <Box border="solid" borderRadius={2} p={2}>
          <LoginForm setRegister={props.setRegister} />
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            mt={2}
            mb={2}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="30vw"
            >
              <Box width="30%">
                <hr></hr>
              </Box>
              <Box>Not Registered?</Box>
              <Box width="30%">
                <hr></hr>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box
              sx={{ textDecoration: "underline" }}
              css={css`
                cursor: pointer;
              `}
              onClick={() => props.setRegister(true)}
            >
              Join
            </Box>
            {"\u00A0"}to access the web app.
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
