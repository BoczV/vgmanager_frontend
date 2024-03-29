import React from "react";
import { v4 } from "uuid";
import { PropTypes } from "prop-types";

const TableHeader = ({ columnList }) => {
  return (
    <thead>
      <tr>
        {columnList.map((column) => {
          return <th key={v4()}>{column}</th>;
        })}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columnList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHeader;
