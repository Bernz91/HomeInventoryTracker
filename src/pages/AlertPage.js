import { useEffect } from "react";
import Box from "@mui/material/Box";
import TitleCard from "../components/TitleCard";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

const AlertPage = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) {
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
