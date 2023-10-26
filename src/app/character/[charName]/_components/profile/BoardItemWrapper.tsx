"use client";

import React, { ReactNode, useState } from "react";
import { Collapse, IconButton, useMediaQuery } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface Props {
  children: ReactNode;
}

export default function BoardItemWrapper(props: Props) {
  const { children } = props;
  const [show, setShow] = useState(useMediaQuery("(min-width:600px)"));

  return (
    <>
      <Collapse in={show}>{children}</Collapse>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <IconButton onClick={() => setShow((s) => !s)}>
          {show ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </div>
    </>
  );
}
