import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from '@mui/icons-material/Clear';

const SearchInput = ({
  placeholder,
  onEnterUp,
  onClear
}: {
  placeholder: string;
  onEnterUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleClearClick = () => {
    setSearchText('');
    onClear();
  };

  return (
    <TextField
      id="search"
      name="search"
      value={searchText}
      placeholder={placeholder}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyUp={onEnterUp}
      variant="outlined"
      InputProps={{
        startAdornment: <SearchIcon color="action" />,
        endAdornment: (
          <InputAdornment position="end">
            {searchText &&
              <IconButton
                aria-label="clear search"
                onClick={handleClearClick}
              >
                <ClearIcon color="action" />
              </IconButton>
            }
          </InputAdornment>
        ),
        style: {
          width: 500,
        },
      }}
    />
  );
};

export default SearchInput;
