import { ForwardedRef, forwardRef } from "react";
import { NumberInputProps, Unstable_NumberInput } from "@mui/base";

import {
  StyledInput,
  StyledButton,
  StyledNumInputRoot,
} from "@/components/styles";

const NumberInput = forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <Unstable_NumberInput
      slots={{
        root: StyledNumInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <span className="arrow">▴</span>,
        },
        decrementButton: {
          children: <span className="arrow">▾</span>,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default NumberInput;
