import React from "react";

const Tag = ({ TagName, ColorHex }) => {
  var classes = `w-fit px-3 py-1 text-sm bg-opacity-10`;
  return (
    <p
      className={classes}
      style={{
        color: ColorHex,
        backgroundColor: ColorHex,
      }}
    >
      {TagName}
    </p>
  );
};

export default Tag;
