import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    selectedGenre: null,
    searchQuery: ""
  };

  async componentDidMount() {
    // const { data } = await getGenres();
    // console.log(data);
    // const { data: movies } = await getMovies();
    // console.log(movies);
    // // using object destructuring to insert a custome 'All Genres' to the front of the array
    // const genres = [{ _id: "", name: "All Genres" }, ...data];
    // this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This moive has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    //console.log("like clicked", movie);
    //clone the movies array into another movies object
    const movies = [...this.state.movies];
    //find the index of the clicked movie object
    const index = movies.indexOf(movie);
    //clone all the properties of the selected movie and store it in a appropriate object of the new movies array (step 1)
    movies[index] = { ...movies[index] };
    //change the liked property of the selected movie object to the opposite, it is boolean, so true becomes false, and false becomes true (toggle between true and false)
    movies[index].liked = !movies[index].liked;
    // set the new movies array to virtual dom
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    // need to set searchQuery to empty string instead of null because searchBox is a controlled component
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      selectedGenre,
      searchQuery
    } = this.state;

    // set the filteredMovie to allMovies, and change the filteredMovie array based on the conditions below, (searchQuery or Selected Genre)
    let filteredMovie = allMovies;
    if (searchQuery)
      filteredMovie = allMovies.filter(m =>
        // search with startsWith, can be changed to includes
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovie = allMovies.filter(m => m.genre._id === selectedGenre._id);

    // sort the filtered list of movies by the state.sortColumn property
    const sorted = _.orderBy(
      filteredMovie,
      [sortColumn.path],
      [sortColumn.order]
    );

    // paginate the list of movies based on the sorted list
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filteredMovie.length, data: movies };
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn,
      genres,
      selectedGenre,
      searchQuery
    } = this.state;

    const { user } = this.props;
    if (count === 0) return <p>There are no movies in the database</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {// only render the new movie button when user has logged in
          user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie{" "}
            </Link>
          )}
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            // pass the sortColumn from the state and store in props
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
