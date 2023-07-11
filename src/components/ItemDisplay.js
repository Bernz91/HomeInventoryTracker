import { Box } from "@mui/system";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { SAMPLE_ITEMS_HOME } from "../SampleData";
import AddGroceryButton from "./buttons/AddGroceryButton";
import DismissButton from "./buttons/DismissButton";

const CountDay = (date) => {
  const currentDate = new Date();
  const expiryDate = new Date(date);
  const dayCount = Math.ceil(
    (expiryDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
  );
  const unit = dayCount > 1 ? "days" : "day";
  return dayCount + " " + unit;
};

const ItemDisplay = (props) => {
  return (
    <Box p={2}>
      {SAMPLE_ITEMS_HOME.map((item) => {
        return (
          <Box
            key={item.itemNo}
            display="flex"
            flexDirection="row"
            alignItems="center"
            border="solid"
            borderRadius={2}
            mu={1}
            mb={1}
          >
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              width="40vw"
              height="5vh"
              css={css`
                cursor: pointer;
              `}
              p={1}
            >
              <Box>{item.name}</Box>
              <Box display="flex" flexDirection="row" fontSize="1rem">
                <Box display="flex" justifyContent="right" width="6vw">
                  {props.title === "Expiring Soon"
                    ? "Expiring in: "
                    : "Quantity: "}
                </Box>
                <Box display="flex" justifyContent="center" width="6vw">
                  {props.title === "Expiring Soon"
                    ? CountDay(item.expiryDate)
                    : item.totalQuantity}
                </Box>
              </Box>
            </Box>
            <Box p={1}>
              {props.title === "Expiring Soon" ? (
                <DismissButton />
              ) : (
                <AddGroceryButton />
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ItemDisplay;
