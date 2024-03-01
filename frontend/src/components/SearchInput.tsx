import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <TextField
      placeholder={placeholder}
      onChange={onChange}
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
