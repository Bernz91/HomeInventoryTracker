import Box from "@mui/material/Box";
import SEARCH_IMAGE from "../assets/images/icons8-search-50.png";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SearchBar = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      border="solid"
      borderRadius={2}
      height="5vh"
      boxShadow={4}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        pt={1}
        pb={1}
        pr={1}
        pl={2}
      >
        <img src={SEARCH_IMAGE} alt="search" width="20px" />
      </Box>
      <Box p={1}>
        <Autocomplete
          size="small"
          options={props.itemList}
          getOptionLabel={(option) => option.itemName}
          // freeSolo={true}
          autoSelect={true}
          sx={{ width: "45vw" }}
          onChange={(e) => {
            props.handleSearch(
              props.itemList.find((o) => o.itemName === e.target.innerText)
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search"
              sx={{
                "& fieldset": { border: "none" },
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  props.handleSearch(
                    props.itemList.find((o) => o.itemName === e.target.value)
                  );
                }
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
