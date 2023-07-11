import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import CategoryFilter from "../components/CategoryFilter";
import InventoryItem from "../components/InventoryItem";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/buttons/SortButton";
import TitleCard from "../components/TitleCard";
import { BACKEND_URL } from "../Constant";
import AddItemButton from "../components/buttons/AddItemButton";
import AddItemPopup from "../popups/AddItemPopup";
import { HANDLE_SORT } from "../helperFunctions/HelperFunctions";
import ErrorHandler from "../components/ErrorHandler";
import { useCategoryContext } from "../context/CategoryContext";
import { useUserContext } from "../context/UserContext";

// TODO:
// 1. ADD checkbox whether to show qty=0 items
// 2. EDIT the add button

const InventoryPage = () => {
  const { user } = useUserContext();
  const [itemList, setItemList] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const { categories, setCategories } = useCategoryContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState();

  const [loadingInventory, setLoadingInventory] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [isAddItem, setAddItem] = useState(false);

  const navigate = useNavigate();

  // need to revise this, dont change itemlist
  const handleSearch = (item) => {
    if (item !== undefined) {
      setSelectedItem(item);
    } else setSelectedItem(null);
  };

  const getInventory = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${BACKEND_URL}/user/${user.userID}/item`,
      });
      setItemList(res.data);
      setLoadingInventory(false);
    } catch (err) {
      console.log(err);
      // alert(ErrorHandler(err.response.data));
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
      setLoadingCategory(false);
    } catch (err) {
      alert(ErrorHandler(err.response.data));
    }
  };

  useEffect(() => {
    if (user === undefined) {
      navigate("/home");
    } else {
      setLoadingInventory(true);
      setLoadingCategory(true);
      getInventory();
      getCategories();
    }
  }, []);

  useEffect(() => {
    setItemList(HANDLE_SORT(sortBy, itemList));
  }, [sortBy]);

  return (
    <Box display="flex" flexDirection="column" height="87vh" p={2}>
      {/* Filter component*/}
      {loadingInventory || loadingCategory ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          {/* The title of the page */}
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width="100%"
          >
            <Box display="flex" flexDirection="row">
              <Box>
                <TitleCard title="Inventory List" />
              </Box>
            </Box>
          </Box>
          <Box>
            <Box pt={2} pl={3} pr={2} pb={1}>
              Categories
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" flexDirection="row">
                <Box pl={1} pr={5}>
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                </Box>
                <SearchBar itemList={itemList} handleSearch={handleSearch} />
              </Box>

              <SortButton setSortBy={setSortBy} />
            </Box>
          </Box>
          <Box>
            {/* ~~~~~~~~~~ START of POP UP for ADD NEW ITEM~~~~~~~~~~*/}
            <AddItemButton setAddItem={setAddItem} />

            <AddItemPopup
              isAddItem={isAddItem}
              categories={categories}
              setAddItem={setAddItem}
              getInventory={getInventory}
            />

            {/* ~~~~~~~~~~ END of POP UP for ADD NEW ITEM~~~~~~~~~~*/}
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            alignContent="flex-start"
            justifyContent="space-between"
            mt={2}
            height="100%"
            sx={{ maxHeight: "100%", overflow: "auto" }}
          >
            {selectedItem === null ? (
              itemList.map((item) => {
                return (
                  <Box
                    key={item.itemNo}
                    display={
                      selectedCategory === "All"
                        ? ""
                        : selectedCategory === item.categoryName
                        ? ""
                        : "none"
                    }
                  >
                    <InventoryItem item={item} getInventory={getInventory} />
                  </Box>
                );
              })
            ) : (
              <InventoryItem item={selectedItem} />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default InventoryPage;
