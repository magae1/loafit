"use client";
import { ReactNode, useState } from "react";
import {
  ListItemButton,
  Collapse,
  ListItemIcon,
  ListItem,
  ListItemProps,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Props extends ListItemProps {
  children: ReactNode;
  open?: boolean;
  icon?: ReactNode;
  item?: ReactNode;
}

export default function ListSectionWrapper(props: Props) {
  const { children, icon, item, open = true } = props;
  const [show, setShow] = useState<boolean>(open);
  return (
    <>
      <ListItem {...props} disablePadding>
        <ListItemButton
          sx={{ height: "inherit" }}
          onClick={() => setShow((s) => !s)}
        >
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          {item}
          {show ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse
        in={show}
        timeout={"auto"}
        sx={{ "& .MuiList-root": { pl: 2 } }}
      >
        {children}
      </Collapse>
    </>
  );
}
