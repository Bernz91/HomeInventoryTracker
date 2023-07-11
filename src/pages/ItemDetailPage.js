import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import ItemDetail from "../components/ItemDetail";
import TitleCard from "../components/TitleCard";
import { BACKEND_URL } from "../Constant";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useCategoryContext } from "../context/CategoryContext";
import ErrorHandler from "../components/ErrorHandler";
import { useUserContext } from "../context/UserContext";

const ItemDetailPage = () => {
  const { state } = useLocation();
  const { itemNo } = state;
  const [item, setItem] = useState();
  const { user } = useUserContext();

  const [loading, setLoading] = useState(true);
  const { categories, setCategories } = useCategoryContext();

  const navigate = useNavigate();

  const getItemDetail = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${BACKEND_URL}/item/${itemNo}`,
      });
      setItem(res.data);
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
      navigate("/");
    } else {
      setLoading(true);
      if (categories === undefined) {
        getCategories();
      }
      getItemDetail();
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" height="85vh" p={2}>
      {loading ? (
        <>
          <Box>
            <TitleCard title="Item Detail" />
          </Box>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      ) : (
        <ItemDetail item={item} getItemDetail={getItemDetail} />
      )}
    </Box>
  );
};

export default ItemDetailPage;
