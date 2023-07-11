import Box from "@mui/material/Box";
import RegisterForm from "../forms/RegisterForm";

const Register = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Box mb={4}>
        <Box
          display="flex"
          fontSize="2.5rem"
          p={2}
          justifyContent="left"
          width="30vw"
        >
          Join to access the web app.
        </Box>
        <Box border="solid" borderRadius={2} p={2}>
          <RegisterForm setRegister={props.setRegister} />

          <Box
            display="flex"
            justifyContent="center"
            mt={2}
            mb={2}
            fontSize="0.8rem"
          >
            By registering, you agree to the terms and conditions.
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
