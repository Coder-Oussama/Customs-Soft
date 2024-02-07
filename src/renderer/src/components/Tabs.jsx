/* eslint-disable prettier/prettier */
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PaidIcon from "@mui/icons-material/Paid";
import PatientViewInfo from "./Patient/Patient_View_Info";
import AppoinmentSide from "./Appoinment";
// import SessionSide from "./Sessions";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab icon={<PersonIcon />} label="التبليغات" {...a11yProps(0)} />
          <Tab
            icon={<AccessTimeFilledIcon />}
            label="المتابعة"
            {...a11yProps(1)}
          />
          <Tab icon={<AssessmentIcon />} label="المحاسبة" {...a11yProps(2)} />
          <Tab icon={<PaidIcon />} label="الارشيف" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PatientViewInfo />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AppoinmentSide />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Seances
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Argent
      </CustomTabPanel>
    </Box>
  );
}
