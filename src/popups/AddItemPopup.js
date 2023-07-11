import { Box } from "@mui/system";
import { MODAL_STYLE } from "../Constant";
import AddItemForm from "../forms/AddItemForm";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const AddItemPopup = (props) => {
  const handleModalClose = () => props.setAddItem(false);

  return (
    <Modal open={props.isAddItem} onClose={handleModalClose}>
      <Box sx={MODAL_STYLE} display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box fontSize="2rem" p={1}>
            Add New Item
          </Box>
          <Box pr={2}>
            <CloseIcon
              onClick={handleModalClose}
              css={css`
                cursor: pointer;
              `}
            />
          </Box>
        </Box>
        <AddItemForm
          setAddItem={props.setAddItem}
          getInventory={props.getInventory}
          item={props.item}
          setDisabled={props.setDisabled}
          deleteGrocery={props.deleteGrocery}
        />
      </Box>
    </Modal>
  );
};

export default AddItemPopup;
