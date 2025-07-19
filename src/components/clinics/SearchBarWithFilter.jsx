import React from "react";

const SearchBarWithFilter = ({ value, onChange, onFilterClick }) => (
  <div className="flex items-center gap-2 w-full bg-white rounded-xl shadow px-4 py-2 mt-4">
    <span className="material-icons text-gray-400">search</span>
    <input
      type="text"
      className="flex-1 bg-transparent outline-none text-base"
      placeholder="Search clinic or doctor name"
      value={value}
      onChange={onChange}
    />
    <button
      onClick={onFilterClick}
      className="text-orange-500 hover:text-orange-600"
    >
      <span className="material-icons">filter_list</span>
    </button>
  </div>
);

export default SearchBarWithFilter;
