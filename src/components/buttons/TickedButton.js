import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/system";
const TickedButton = (props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="darkgrey"
      borderRadius={2}
      width="4vw"
      height="4vh"
      color="white"
    >
      <DoneIcon fontSize="16px" />
    </Box>
  );
};

export default TickedButton;
