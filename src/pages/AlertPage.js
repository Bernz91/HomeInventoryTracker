import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";

import Box from "@mui/material/Box";

import TitleCard from "../components/TitleCard";

const AlertPage = () => {
  const [cookies] = useCookies(["userCookie"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.userCookie.userID === undefined) {
      navigate("/");
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" height="87vh" p={2}>
      <TitleCard title="Alerts" />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mt={2}
        ml={4}
      >
        FOR FUTURE DEVELOPMENT
      </Box>
    </Box>
  );
};

export default AlertPage;
