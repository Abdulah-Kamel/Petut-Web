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
      className="flex items-center gap-1 focus:outline-none"
      style={{ direction: "ltr" }}
    >
      <span
        className="material-icons text-2xl"
        style={{
          color: "#ff6600",
          background: "#fff",
          borderRadius: "50%",
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)",
          padding: 6,
          transition: "background 0.2s",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.background = "rgba(255,102,0,0.08)")
        }
        onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
      >
        filter_list
      </span>
    </button>
  </div>
);

export default SearchBarWithFilter;
