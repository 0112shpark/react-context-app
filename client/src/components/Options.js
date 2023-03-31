import React from "react";

const Options = ({ name, description }) => {
  return (
    <form>
      <input type="checkbox" id={`${name} option`} />{" "}
      <label htmlFor={`${name} option`}>
        {name} - {description}
      </label>
    </form>
  );
};

export default Options;
