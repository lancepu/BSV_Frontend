import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    // if there's a property under called content for column, render the content (which is a function in MoviesTable) that
    // takes in a movies array, in this case, the movies array is stored in item when we call the renderCell function
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              // this gets the path of the columns, which is named the same as the properties of the data, so
              // movies.genres.name, movies.title, etc.
              // need lodash for this because of the nested movies.genres.name
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
