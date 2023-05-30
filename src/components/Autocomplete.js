import ReactAutocomplete from "react-autocomplete";

const Autocomplete = ({ items, value, onChange, onSelect }) => {
  const filterItems = (searchTerm) => {
    if (!items) {
      return [];
    }
    return items.filter((item) =>
      item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  };

  return (
    <ReactAutocomplete
      items={filterItems(value) || []}
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      open={true}
      renderInput={(props) => (
        <input
          {...props}
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
        />
      )}
      renderItem={(item, isHighlighted) => (
        <div
          key={item.id}
          style={{
            backgroundColor: isHighlighted ? "lightgray" : "white",
          }}
        >
          {item.name}
        </div>
      )}
      getItemValue={(item) => item.name}
      menuStyle={{
        position: "absolute",
        zIndex: "999",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      }}
    />
  );
};

export default Autocomplete;
