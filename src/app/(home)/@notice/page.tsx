import Link from "next/link";
import { Link as MuiLink, Stack, Badge } from "@mui/material";
import _ from "underscore";
import dayjs from "dayjs";

import { TNotice } from "@/libs/types";
import GridItem from "@/app/(home)/_component/GridItem";

async function getNotices() {
  const res = await fetch(`${process.env.LOA_URL}/news/notices`, {
    headers: { Authorization: `Bearer ${process.env.LOA_JWT}` },
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) throw new Error();

  return res.json();
}

export default async function Page() {
  const notices: TNotice[] = await getNotices();

  return (
    <GridItem title={"공지사항"}>
      <Stack>
        {notices.slice(0, 8).map((v) => (
          <Badge
            key={_.uniqueId("notice-item")}
            color={"info"}
            variant={"dot"}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            invisible={dayjs(v.Date).isBefore(dayjs().subtract(1, "day"))}
          >
            <MuiLink
              component={Link}
              href={v.Link}
              target={"_blank"}
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              color={"primary.contrastText"}
            >
              {`[${v.Type}] ${v.Title}`}
            </MuiLink>
          </Badge>
        ))}
      </Stack>
    </GridItem>
  );
}
