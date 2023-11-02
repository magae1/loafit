import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  Input,
  InputBase,
  Stack,
  TextField,
} from "@mui/material";

import { AuctionOptionInput } from "@/components/styles";
import { auctionOptions } from "@/libs/data";

export default function AuctionSearchInputs() {
  return (
    <Grid container>
      <Grid item>
        <Autocomplete
          options={auctionOptions.ItemGradeQualities}
          renderInput={(params) => <TextField {...params} size={"small"} />}
        />
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}
