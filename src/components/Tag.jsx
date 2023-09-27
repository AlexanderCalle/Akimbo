import React from "react";

const Tag = ({ TagName, Color }) => {
  var classes = `w-fit px-3 py-1 text-sm bg-opacity-10 bg-tag-${Color.toLowerCase()} text-tag-${Color.toLowerCase()}`;

  return <p className={classes}>{TagName}</p>;
};

export default Tag;
