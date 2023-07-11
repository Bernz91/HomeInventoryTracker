import { Route, Routes } from "react-router-dom";
import GroceryPage from "../pages/GroceryPage";
import HomePage from "../pages/HomePage";
import InventoryPage from "../pages/InventoryPage";
import ItemDetailPage from "../pages/ItemDetailPage";
import AlertPage from "../pages/AlertPage";
import NothingHerePage from "../pages/NothingHerePage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/item" element={<ItemDetailPage />} />
      <Route path="/grocery" element={<GroceryPage />} />
      <Route path="/alert" element={<AlertPage />} />
      <Route path="*" element={<NothingHerePage />} />
    </Routes>
  );
};

export default Router;
