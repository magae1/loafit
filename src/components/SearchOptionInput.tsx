import { useAutocomplete } from "@mui/material";

interface Props {
  options: (string | number)[];
}

export default function SearchOptionInput(props: Props) {
  const { options } = props;
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: options,
    getOptionLabel: (option) => `${option}`,
  });

  return;
}
