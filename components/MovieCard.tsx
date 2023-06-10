import React from 'react';

interface Movie {
  title: string;
  poster_path: string;
  description: string;
}

interface MovieCardProps {
  movie: Movie;
  index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster_path} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieCard;
