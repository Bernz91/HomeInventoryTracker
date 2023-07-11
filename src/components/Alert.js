import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import SwitchButton from "./buttons/SwitchButton";
import { useState } from "react";

//todo: rendering of the textfield when the switch is turned on and off

const Alert = (props) => {
  const alert = props.alert;
  const fontAdjustment = props.fontAdjustment;
  const [lowInventoryAlert, setLowInventoryAlert] = useState(
    alert === undefined ? false : alert.lowInventoryAlert
  );
  const [expiryDateAlert, setExpiryDateAlert] = useState(
    alert === undefined ? false : alert.expiryDateAlert
  );

  const [inventoryThreshold, setInventoryThreshold] = useState(
    alert === undefined ? 0 : alert.inventoryThreshold
  );
  const [daysBeforeExpDate, setDaysBeforeExpDate] = useState(
    alert === undefined ? 0 : alert.daysBeforeExpiryDate
  );

  const handleChange = (e, alert) => {
    if (alert === "low inventory") {
      setLowInventoryAlert(e.target.checked);
      if (e.target.checked === false) {
        setInventoryThreshold(0);
      }
    } else {
      setExpiryDateAlert(e.target.checked);
      if (e.target.checked === false) {
        setDaysBeforeExpDate(0);
      }
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="15vh"
      p={2}
    >
      <Box display="flex" flexDirection="row" justifyContent="right">
        <Box
          display="flex"
          alignItems="center"
          fontSize={`${1 + fontAdjustment}rem`}
        >
          Low Inventory Alert
        </Box>
        <Box p={1}>
          <SwitchButton
            checked={lowInventoryAlert}
            inputProps={{ "aria-label": "Low Inventory Alert" }}
            size="small"
            color="default"
            onChange={(e) => {
              handleChange(e, "low inventory");
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="right"
      >
        <Box fontSize={`${0.8 + fontAdjustment}rem`}>Inventory threshold:</Box>
        <Box width="5vw" pl={1}>
          <TextField
            variant="outlined"
            size="small"
            defaultValue={inventoryThreshold}
            disabled={!lowInventoryAlert}
            inputProps={{
              style: {
                height: "1.5vh",
                textAlign: "center",
                fontSize: "0.8rem",
                color: !lowInventoryAlert ? "#000000" : "#A9A9A9",
              },
            }}
            onBlur={(e) => {
              setInventoryThreshold(e.target.value);
            }}
          />
        </Box>
      </Box>

      <Box display="flex" flexDirection="row" justifyContent="right">
        <Box
          display="flex"
          alignItems="center"
          fontSize={`${1 + fontAdjustment}rem`}
        >
          Expiry Date Alert
        </Box>
        <Box p={1}>
          <SwitchButton
            checked={expiryDateAlert}
            inputProps={{ "aria-label": "Expiry Date Alert" }}
            size="small"
            color="default"
            onChange={(e) => {
              handleChange(e, "expiry date");
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="right"
      >
        <Box fontSize={`${0.8 + fontAdjustment}rem`}>
          Days before expiry date:
        </Box>
        <Box width="5vw" pl={1}>
          <TextField
            variant="outlined"
            size="small"
            defaultValue={daysBeforeExpDate}
            disabled={!expiryDateAlert}
            inputProps={{
              style: {
                height: "1.5vh",
                textAlign: "center",
                color: !expiryDateAlert ? "#000000" : "#A9A9A9",
                fontSize: "0.8rem",
              },
            }}
            onBlur={(e) => {
              setDaysBeforeExpDate(e.target.value);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Alert;
