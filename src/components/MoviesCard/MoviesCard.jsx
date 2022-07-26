import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './MoviesCard.css';
import { formatDuration } from '../../utils/formatDuration'
import { BASE_URL, PAGES } from '../../utils/constants'

function MoviesCard({ film, handleClickLikeButton }) {
  const [filmId, setFilmId] = useState('')
  const isSavedMovies = useHistory().location.pathname === PAGES.SAVED_MOVIES
  const imageUrl = film.thumbnail || `${BASE_URL}/${film.image.formats.thumbnail.url}`

  useEffect(() => {
    const filmId = film._id
    if (filmId) setFilmId(filmId)
  }, [film._id])

  function clickLikeButton() {
    if (isSavedMovies) {
      handleClickLikeButton(filmId)
    } else {
      const filmData = {
        country: film.country || '-',
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        image: BASE_URL + film.image.url,
        trailerLink: film.trailerLink,
        nameRU: film.nameRU,
        nameEN: film.nameEN || '-',
        thumbnail: BASE_URL + film.image.formats.thumbnail.url,
        movieId: film.id,
      }

      handleClickLikeButton(filmId, filmData)
        .then(film => {
          setFilmId(filmId ? '' : film._id)
        })
    }
  }
  

  return (
    <li className="card-film">
      
        <div className="card-film__row">
          <p className="card-film__name">{film.nameRU}</p>
          <p className="card-film__duration">{formatDuration(film.duration)}</p>
        </div>
        <a className='card-film__trailer-link' href={film.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="card-film__image"
          src={imageUrl}
          alt={film.nameRU}
        />
        </a>
          <div className="card-film__like-button-container">
            <button
            className={
              filmId
                ? "card-film__like-button card-film__like-button_active"
                : "card-film__like-button"
            }
            type="button"
            onClick={clickLikeButton}
            ></button>
          </div>
    </li >
  );
}

export default MoviesCard;
