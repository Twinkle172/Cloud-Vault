import "./SearchBar.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search in CloudVault",
}: SearchBarProps) => {
  return (
    <div className="cvSearch glass">
      <SearchRoundedIcon />
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
