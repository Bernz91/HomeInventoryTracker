import { Box } from "@mui/system";
import { MODAL_STYLE } from "../Constant";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import EditPurchaseForm from "../forms/EditPurchaseForm";

const EditPurchasePopup = (props) => {
  const handleModalClose = () => props.setOpen(false);

  return (
    <Modal open={props.isOpen} onClose={handleModalClose}>
      <Box sx={MODAL_STYLE} display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box fontSize="2rem" p={1}>
            Edit Purchase Detail
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
        <EditPurchaseForm
          purchase={props.purchase}
          setOpen={props.setOpen}
          getItemDetail={props.getItemDetail}
        />
      </Box>
    </Modal>
  );
};

export default EditPurchasePopup;
