import React, { useState } from "react";
import SearchBar from './SearchBar';
import Movies from './Movies';

const Content = () => {
  const [movies, setMovies] = useState([])

	const getMovies = (value) => new Promise((resolve, reject) => {
		fetch(`http://www.omdbapi.com/?apikey=5e7f96eb&s=${value}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.Response && data.Error) {
				return reject(data.Error)
			}
			setMovies(data.Search)
			resolve(data.Search.length)
		})
		.catch(() => {
			reject('Something went wrong, try again.')
		})

	});

  return (
    <div>
      <SearchBar
        getMovies={getMovies}
        movies={movies}
        updateExistingMovies={setMovies}
      />
      {movies.length ? <Movies movies={movies} /> : null}
    </div>
  );
};

export default Content;