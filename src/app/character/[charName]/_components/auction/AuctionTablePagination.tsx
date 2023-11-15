import { IconButton, Typography } from "@mui/material";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";

interface Props {
  PageNo: number;
  changePageNo: (n: number) => void;
  loading: boolean;
  TotalCount?: number;
}

export default function AuctionTablePagination(props: Props) {
  const { PageNo, changePageNo, loading, TotalCount = 0 } = props;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={() => changePageNo(1)}
        disabled={PageNo === 1 || loading}
        aria-label={"첫 페이지"}
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={() => changePageNo(PageNo - 1)}
        disabled={PageNo === 1 || loading}
        aria-label={"이전 페이지"}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <Typography variant={"button"}>{PageNo}</Typography>
      <IconButton
        onClick={() => changePageNo(PageNo + 1)}
        disabled={PageNo >= Math.floor(TotalCount / 10) || loading}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={() => changePageNo(Math.floor(TotalCount / 10))}
        disabled={PageNo >= Math.floor(TotalCount / 10) || loading}
        aria-label={"마지막 페이지"}
      >
        <LastPage />
      </IconButton>
    </div>
  );
}
