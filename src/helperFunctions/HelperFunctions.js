export const HANDLE_SORT = (sortBy, list) => {
  if (sortBy === undefined) return;
  const temp = [...list];
  switch (sortBy) {
    case "Alphabetically - A -> Z":
      temp.sort((a, b) => {
        let na = a.itemName.toLowerCase(),
          nb = b.itemName.toLowerCase();
        if (na < nb) {
          return -1;
        }
        if (na > nb) {
          return 1;
        }
        return 0;
      });
      break;
    case "Alphabetically - Z -> A":
      temp.sort((a, b) => {
        let na = a.itemName.toLowerCase(),
          nb = b.itemName.toLowerCase();
        if (na < nb) {
          return 1;
        }
        if (na > nb) {
          return -1;
        }
        return 0;
      });
      break;
    case "By Quantity - low to high":
      temp.sort((a, b) => {
        return a.totalQuantity === undefined
          ? a.quantity - b.quantity
          : a.totalQuantity - b.totalQuantity;
      });
      break;
    case "By Quantity - high to low":
      temp.sort((a, b) => {
        return a.totalQuantity === undefined
          ? b.quantity - a.quantity
          : b.totalQuantity - a.totalQuantity;
      });
      break;
    case "By Ticked":
      temp.sort((a, b) => {
        return Number(a.ticked) - Number(b.ticked);
      });
      break;
    case "By Purchase Date - latest to earliest":
      temp.sort((a, b) => {
        let da = new Date(a.purchaseDate),
          db = new Date(b.purchaseDate);
        return db - da;
      });
      break;
    case "By Checkout Date - latest to earliest":
      temp.sort((a, b) => {
        let da = new Date(a.checkoutDate),
          db = new Date(b.checkoutDate);
        return da - db;
      });
      break;
    default:
      break;
  }
  return temp;
};

export const DATE_FORMATTER = (date) => {
  if (Object.prototype.toString.call(date) !== "[object Date]") return "-";
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const yyyy = date.getFullYear();
  let mm = date.getMonth();
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  // if (mm < 10) mm = "0" + mm;

  return dd + " " + monthNames[mm] + " " + yyyy;
};
