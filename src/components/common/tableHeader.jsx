import React, { Component } from "react";

//need the following props
// columns: array
//sortColumn: object
// onSort: function

class TableHeader extends Component {
  raiseSort = path => {
    // clone the sortColumn from props to a new sortColumn variable
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    // passes the sortColumn object to the movies class
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { path, order } = this.props.sortColumn;
    //dont show the sort arrow if the current column is not the column being used for sorting
    if (column.path !== path) return null;
    // use the asc font awesome for asc order, desc font awesome for desc order
    if (order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
