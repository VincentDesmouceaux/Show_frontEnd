import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const Autocomplete = ({ items, onChange, onSelect, value }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const filteredOptions = items.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.date.toLowerCase().includes(value.toLowerCase())
    );
    setOptions(filteredOptions);
  }, [value, items]);

  const handleOnSearch = (text) => {
    onChange(text);
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
      resultStringKeyName="name"
      placeholder="Search events"
      styling={{
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
      }}
    />
  );
};

export default Autocomplete;
