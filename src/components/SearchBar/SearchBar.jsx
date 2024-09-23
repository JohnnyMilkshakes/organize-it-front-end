import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <input
      type="text"
      placeholder="Search locations and items..."
      value={searchQuery}
      onChange={handleSearchInput}
      style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
      className="search-bar"
    />
  );
};

export default SearchBar;