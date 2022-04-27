import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "remove":
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      throw new Error();
  }
}

function FavoriteMovies() {
  const [movies, dispatch] = useReducer(reducer, [{ name: "Heat" }]);
  const [newMovie, setNewMovie] = useState("");

  const handleAddClick = () => {
    if (newMovie === "") {
      return;
    }
    dispatch({ type: "add", item: { name: newMovie } });
    setNewMovie("");
  };

  return (
    <>
      <div className="movies">
        {movies.map((movie, index) => {
          return (
            <Movie
              movie={movie}
              onRemove={() => dispatch({ type: "remove", index })}
            />
          );
        })}
      </div>
      <div className="add-movie">
        <input
          type="text"
          value={newMovie}
          onChange={event => setNewMovie(event.target.value)}
        />
        <button onClick={handleAddClick}>Add movie</button>
      </div>
    </>
  );
}

function Movie({ movie, onRemove }) {
  return (
    <div className="movie">
      <span>{movie.name}</span>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h2>My favorite movies</h2>
      <FavoriteMovies />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
