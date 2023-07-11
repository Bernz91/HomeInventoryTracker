import { Box } from "@mui/system";
import { MODAL_STYLE } from "../Constant";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import AddGroceryForm from "../forms/AddGroceryForm";

const AddGroceryPopup = (props) => {
  const handleModalClose = () => props.setOpen(false);

  return (
    <Modal open={props.isOpen} onClose={handleModalClose}>
      <Box sx={MODAL_STYLE} display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box fontSize="2rem" p={1}>
            Add to Grocery
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
        <AddGroceryForm
          purchase={props.purchase}
          setOpen={props.setOpen}
          getGrocery={props.getGrocery}
        />
      </Box>
    </Modal>
  );
};

export default AddGroceryPopup;
