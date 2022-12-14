import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { wallet } from "../common/common";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const sent = wallet.getSent();
  const received = wallet.getReceived();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="送信" {...a11yProps(0)} />
          <Tab label="受信" {...a11yProps(1)} />
          <Tab label="Item" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
            送信履歴
          </Typography>
          <List dense={false}>
            {sent
              .slice()
              .reverse()
              .map((transaction, index) => (
                <ListItem
                  key={index}
                  component={Link}
                  to={"/chat?address=" + transaction.to}
                  sx={{ color: "black" }}
                >
                  <ListItemText
                    primary={transaction.message}
                    secondary={transaction.timestamp}
                  />
                </ListItem>
              ))}
          </List>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
            受信履歴
          </Typography>
          <List dense={false}>
            {received
              .slice()
              .reverse()
              .map((transaction, index) =>
                transaction.from !== "System" ? (
                  <ListItem
                    key={index}
                    component={Link}
                    to={"/chat?address=" + transaction.from}
                    sx={{ color: "black" }}
                  >
                    <ListItemText
                      primary={transaction.message}
                      secondary={transaction.timestamp}
                    />
                  </ListItem>
                ) : (
                  <React.Fragment key={index}></React.Fragment>
                )
              )}
          </List>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        Item
      </TabPanel>
    </Box>
  );
}
