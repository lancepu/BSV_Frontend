// import React, { Component } from "react";
// import Like from "./common/like";
// import Table from "./common/table";
// import { Link } from "react-router-dom";
// import auth from "../services/authService";

// class MoviesTable extends Component {
//   // this doesnt need to be changed during the life of the component, so doesn't need to be part of the props
//   columns = [
//     {
//       path: "title",
//       label: "Title",
//       // this adds a link to the tile of each movie, clicking on the link will direct to the movie form of each movie
//       content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
//     },
//     { path: "genre.name", label: "Genre" },
//     { path: "numberInStock", label: "Stock" },
//     { path: "dailyRentalRate", label: "Rate" },
//     // the 2 empty objects below are for the like and delete buttons, they don't need a path or label.
//     {
//       key: "like",
//       // react component is an object, we can pass the objects
//       content: movie => (
//         <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
//       )
//     }
//   ];

//   deleteColumn = {
//     key: "delete",
//     content: movie => (
//       <button
//         onClick={() => this.props.onDelete(movie)}
//         className="btn btn-danger btn-sm"
//       >
//         Delete
//       </button>
//     )
//   };

//   constructor() {
//     super();
//     const user = auth.getCurrentUser();
//     if (user && user.isAdmin) this.columns.push(this.deleteColumn);
//   }

//   render() {
//     const { movies, onSort, sortColumn } = this.props;

//     return (
//       <Table
//         columns={this.columns}
//         data={movies}
//         sortColumn={sortColumn}
//         onSort={onSort}
//       />
//     );
//   }
// }

// export default MoviesTable;
