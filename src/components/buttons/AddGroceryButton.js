import { Box } from "@mui/system";
import BASKET_IMAGE from "../../assets/images/icons8-basket-96-white.png";
import { BACKEND_URL } from "../../Constant";
import axios from "axios";
import ErrorHandler from "../ErrorHandler";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

const AddGroceryButton = (props) => {
  const [data, setData] = useState();

  const handleClick = () => {
    setData({
      userId: props.user.userID,
      itemNo: props.item.itemNo,
      itemName: props.item.itemName,
      quantity: 1,
    });
  };

  const postGrocery = async () => {
    try {
      await axios({
        method: "POST",
        url: `${BACKEND_URL}/grocery`,
        data: data,
      });
      setData(undefined);
      props.setAddGrocery(true);
    } catch (err) {
      alert(ErrorHandler(err.response.data));
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      postGrocery();
    }
  }, [data]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="black"
      borderRadius={2}
      width="4vw"
      height="4vh"
      css={css`
        cursor: pointer;
      `}
      onClick={handleClick}
    >
      <img src={BASKET_IMAGE} alt="Basket" width="16px" />
    </Box>
  );
};

export default AddGroceryButton;
