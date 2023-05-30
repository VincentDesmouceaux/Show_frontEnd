import React, { useState } from "react";
import Select from "react-select";

const Autocomplete = ({ items, onChange, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = items
    ? items.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    : [];

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelect(selectedOption);
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleSelectChange}
      placeholder="Recherche des articles"
      isClearable
    />
  );
};

export default Autocomplete;
