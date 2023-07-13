import { Box } from "@mui/system";
import SORT_IMAGE from "../../assets/images/icons8-sort-50.png";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const SortButton = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
    if (e.target.dataset.myValue !== undefined) {
      props.setSortBy(e.target.dataset.myValue);
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        pr={1}
        css={css`
          cursor: pointer;
        `}
        onClick={handleClick}
      >
        Sort{"\u00A0"}
        <img src={SORT_IMAGE} alt="sort icon" width="24px" />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {props.sortLabel.map((sort) => {
          return (
            <Box key={sort}>
              <MenuItem
                data-my-value={sort}
                onClick={(e) => {
                  handleClose(e);
                }}
              >
                {sort}
              </MenuItem>
            </Box>
          );
        })}
        <MenuItem></MenuItem>
      </Menu>
    </>
  );
};

export default SortButton;
