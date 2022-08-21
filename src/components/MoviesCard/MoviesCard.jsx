import './MoviesCard.css';

import photoCard from '../../images/film.jpg'

function MoviesCard() {
  const isFavofiteFilm = true

  return (
    <li className="card-film">
      
        <div className="card-film__row">
          <p className="card-film__name">В погоне за Бенкси</p>
          <p className="card-film__duration">1ч 47м</p>
        </div>
        <img
          className="card-film__image"
          src={photoCard}
          alt="Фильм"
        />
          <div className="card-film__like-button-container">
            <button
            className={
              isFavofiteFilm
                ? "card-film__like-button card-film__like-button_active"
                : "card-film__like-button"
            }
            type="button"
            ></button>
          </div>
    </li >
  );
}

export default MoviesCard;
