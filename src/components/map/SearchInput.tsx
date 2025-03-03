import React from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="relative mb-4 mt-12">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        size={18}
      />
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 rounded-lg text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
