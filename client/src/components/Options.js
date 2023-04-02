import React from "react";

const Options = ({ name, description, updateItemcount }) => {
  return (
    <form>
      <input
        type="checkbox"
        id={`${name} option`}
        onChange={(e) => updateItemcount(name, e.target.checked ? 1 : 0)}
      />{" "}
      <label htmlFor={`${name} option`}>
        {name} - {description}
      </label>
    </form>
  );
};

export default Options;
