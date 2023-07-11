import { Box } from "@mui/system";
import { MODAL_STYLE } from "../Constant";
import AddStockForm from "../forms/AddStockForm";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const AddStockPopup = (props) => {
  const handleModalClose = () => props.setAddStock(false);

  return (
    <Modal open={props.isAddStock} onClose={handleModalClose}>
      <Box sx={MODAL_STYLE} display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box fontSize="2rem" p={1}>
            Add Stock
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
        <AddStockForm
          item={props.item}
          setAddStock={props.setAddStock}
          getItemDetail={props.getItemDetail}
          getInventory={props.getInventory}
          setDisabled={props.setDisabled}
          deleteGrocery={props.deleteGrocery}
        />
      </Box>
    </Modal>
  );
};

export default AddStockPopup;
