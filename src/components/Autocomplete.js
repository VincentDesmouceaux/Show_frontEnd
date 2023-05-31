import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Autocomplete = ({ items, onChange, onSelect, value }) => {
  const [options, setOptions] = useState([]);

  const handleOnSearch = (text) => {
    onChange(text);

    const filteredOptions = items.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.date.toLowerCase().includes(text.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  const handleOnSelect = (item) => {
    onSelect(item);
  };

  const formatResult = (item) => {
    return item.name;
  };

  return (
    <ReactSearchAutocomplete
      items={options}
      onSearch={handleOnSearch}
      onSelect={handleOnSelect}
      autoFocus
      formatResult={formatResult}
      value={value}
      resultStringKeyName="name" // Specify the key name for the result string
      placeholder="Search events" // Add a placeholder to the search input
      styling={{
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
      }}
    />
  );
};

export default Autocomplete;
