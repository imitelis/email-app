import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({
  placeholder,
  onEnterUp
}: {
  placeholder: string;
  onEnterUp: (event: React.KeyboardEvent<HTMLInputElement>) => void
}) => {
  return (
    <TextField
      id="search"
      name="search"
      placeholder={placeholder}
      onKeyUp={onEnterUp}
      variant="outlined"
      InputProps={{
        startAdornment: <SearchIcon color="action" />,
        style: {
          width: 500,
        },
      }}
    />
  );
};

export default SearchInput;
