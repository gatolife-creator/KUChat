import * as React from "react";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Correspondent(props) {
  const { name, address, message } = props;
  return (
    <ListItem component={Link} to={"/chat?address=" + address}>
      <ListItemDecorator sx={{ alignSelf: "flex-start" }}>
        <Avatar src="/static/images/avatar/1.jpg" />
      </ListItemDecorator>
      <ListItemContent>
        <Typography>{name}</Typography>
        <Typography noWrap>
          {message}
        </Typography>
      </ListItemContent>
    </ListItem>
  );
}
