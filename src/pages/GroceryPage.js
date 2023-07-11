import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import GroceryList from "../components/GroceryList";
import TitleCard from "../components/TitleCard";
import axios from "axios";
import { BACKEND_URL } from "../Constant";
import SortButton from "../components/buttons/SortButton";
import { HANDLE_SORT } from "../helperFunctions/HelperFunctions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchBar from "../components/SearchBar";
import { GROCERY_PAGE_PIC, GROCERY_PAGE_PIC2 } from "../Constant";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import AddGroceryPopup from "../popups/AddGroceryPopup";
import ErrorHandler from "../components/ErrorHandler";
import { useCategoryContext } from "../context/CategoryContext";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router";

//TO DO
// 1. CHANGE add to grocery icon to a tick when added to the card instead of using backdrop
// 2. ADD to inventory
// 3. remove button
// 4. Add time stamp so that at the top is the last added ones
// 5. DELETE ALL button

const GroceryPage = () => {
  const { user } = useUserContext();
  const [isLoading, setLoading] = useState(true);
  const [isAddGrocery, setAddGrocery] = useState(false);
  const [groceryList, setGroceryList] = useState();
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [sortBy, setSortBy] = useState();
  const { categories, setCategories } = useCategoryContext();

  const navigate = useNavigate();

  const getGrocery = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${BACKEND_URL}/user/${user.userID}/grocery`,
      });
      const temp = HANDLE_SORT("By Ticked", res.data);
      setGroceryList(temp);
      setLoading(false);
    } catch (err) {
      alert(ErrorHandler(err.response.data));
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${BACKEND_URL}/categories`,
      });
      const temp = [];
      for (let i = 0; i < res.data.length; i++) {
        temp.push(res.data[i].categoryName);
      }
      setCategories(temp);
    } catch (err) {
      alert(ErrorHandler(err.response.data));
    }
  };

  useEffect(() => {
    if (user === undefined) {
      navigate("/home");
    } else {
      setLoading(true);
      if (categories === undefined) {
        getCategories();
      }
      getGrocery();
    }
  }, []);

  useEffect(() => {
    setGroceryList(HANDLE_SORT(sortBy, groceryList));
  }, [sortBy]);

  const handleSearch = (item) => {
    if (item !== undefined) {
      setSelectedItem(item);
    } else setSelectedItem(undefined);
  };

  const handleSort = () => {
    setGroceryList(HANDLE_SORT("By Ticked", groceryList));
  };

  return (
    <Box display="flex" flexDirection="column" height="87vh" p={2}>
      {!isLoading && (
        <>
          <TitleCard title="Grocery List" />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            mt={2}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              width="75vw"
            >
              <Box
                display="flex"
                alignItems="center"
                flexDirection="row"
                justifyContent="right"
                width="15vw"
                pl={4}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  width="15vw"
                  height="4vh"
                  border="solid"
                  borderRadius={2}
                  pl={2}
                  css={css`
                    cursor: pointer;
                  `}
                  onClick={() => setAddGrocery(true)}
                >
                  <AddCircleOutlineIcon fontSize="18px" />
                  {"\u00A0"}Add Item
                </Box>
                <AddGroceryPopup
                  isOpen={isAddGrocery}
                  setOpen={setAddGrocery}
                  getGrocery={getGrocery}
                />
              </Box>
              <SearchBar itemList={groceryList} handleSearch={handleSearch} />
            </Box>
            <SortButton setSortBy={setSortBy} />
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box display="flex" height="70vh" width="30vw" mt={2}>
              <img
                src={GROCERY_PAGE_PIC}
                style={{ maxHeight: "100%", marginBottom: 0, width: "auto" }}
                alt="Grocery"
              />
            </Box>
            <GroceryList
              groceryList={groceryList}
              selectedItem={selectedItem}
              handleSort={handleSort}
              getGrocery={getGrocery}
            />
          </Box>
        </>
      )}
    </Box>
  );
};
export default GroceryPage;
