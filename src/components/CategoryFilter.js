import { useState } from "react";
import { Box } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import DROP_DOWN_IMAGE from "../assets/images/icons8-drop-down-90.png";
import { useCategoryContext } from "../context/CategoryContext";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CategoryFilter = (props) => {
  const { categories } = useCategoryContext();
  const categoriesWithAll = ["All", ...categories];
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    if (e.target.dataset.myValue !== undefined) {
      setSelectedCategory(e.target.dataset.myValue);
      props.setSelectedCategory(e.target.dataset.myValue);
    }
  };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        height="5vh"
        width="14vw"
        justifyContent="space-between"
        border="solid"
        borderRadius={2}
        pl={3}
        pr={1}
        onClick={handleClick}
        css={css`
          cursor: pointer;
        `}
      >
        <Box>{selectedCategory}</Box>
        <Box display="flex" alignItems="center">
          <img src={DROP_DOWN_IMAGE} alt="Down button" width="20px" />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: "50vh",
            width: "17vw",
          },
        }}
      >
        <MenuList dense>
          {categoriesWithAll.map((category) => {
            return (
              <MenuItem
                key={category}
                data-my-value={category}
                onClick={(e) => {
                  handleClose(e);
                }}
              >
                {category}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};

export default CategoryFilter;
