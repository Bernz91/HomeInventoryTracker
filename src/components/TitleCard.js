import { Box } from "@mui/system";

const TitleCard = (props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="#222222"
      height="6vh"
      width="15vw"
      color="white"
      borderRadius={2}
      pl={4}
    >
      {props.title}
    </Box>
  );
};

export default TitleCard;
