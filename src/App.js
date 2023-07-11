import { Box } from "@mui/system";
import "./App.css";
import NavBar from "./nav/NavBar";
import Router from "./router/Router";

const App = () => {
  return (
    <Box>
      <NavBar />
      <Router />
    </Box>
  );
};

export default App;
