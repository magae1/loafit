"use client";
import { ReactNode, useState } from "react";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Props {
  children: ReactNode;
  label: string;
  icon?: ReactNode;
}

export default function ListSectionWrapper(props: Props) {
  const { children, label, icon } = props;
  const [show, setShow] = useState(true);
  return (
    <>
      <ListItemButton onClick={() => setShow((s) => !s)}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label} />
        {show ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={show} timeout={"auto"}>
        {children}
      </Collapse>
    </>
  );
}
