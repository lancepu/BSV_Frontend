import React from "react";
import PropTypes from "prop-types";

const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem
  } = props;
  return (
    <ul className="list-group">
      {items.map(i => (
        <li
          onClick={() => onItemSelect(i)}
          key={i[valueProperty]}
          className={
            i === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {i[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired
  //   textProperty: PropTypes.string.isRequired,
  //   valueProperty: PropTypes.string.isRequired
  //onPageChange: PropTypes.func.isRequired
};

export default ListGroup;
