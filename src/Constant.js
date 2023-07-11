import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import BASKET_IMAGE from "./assets/images/icons8-basket-96.png";

export const BACKEND_URL = "http://localhost:8080";

const INVENTORY_NAV = () => {
  return (
    <>
      <Inventory2OutlinedIcon />
      {"\u00A0"}Inventory
    </>
  );
};
const GROCERY_NAV = () => {
  return (
    <>
      <img src={BASKET_IMAGE} alt="Basket" width="24px" />
      {"\u00A0"}Grocery
    </>
  );
};

const ALERT_NAV = () => {
  return (
    <>
      <NotificationsNoneOutlinedIcon />
      {"\u00A0"}Alert
    </>
  );
};

export const NAV_ITEMS = [
  { name: "Inventory", icon: <INVENTORY_NAV />, path: "/inventory" },
  { name: "Grocery", icon: <GROCERY_NAV />, path: "/grocery" },
  { name: "Sign Out", icon: null, path: "/home" },
  { name: "Alert", icon: <ALERT_NAV />, path: "/alert" },
];

export const HOME_PAGE_PIC =
  "https://images.unsplash.com/photo-1514237487632-b60bc844a47d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";

export const GROCERY_PAGE_PIC =
  "https://images.unsplash.com/photo-1516002484455-c1618f088baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80";

export const GROCERY_PAGE_PIC2 =
  "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";

export const STATISTICS_LABEL = [
  "Last Checkout Date: ",
  "Stocks would last until: ",
  "Average Usage Time (days): ",
  "Average Price / item: $",
];

export const SORT_LABEL = [
  "Alphabetically - A -> Z",
  "Alphabetically - Z -> A",
  "By Quantity - high to low",
  "By Quantity - low to high",
];

export const MODAL_STYLE = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  border: "solid",
  p: 6,
  borderRadius: 16,
};
