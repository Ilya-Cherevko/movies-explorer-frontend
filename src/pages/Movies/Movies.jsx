import { useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import HeaderAndFooterLayout from '../../layouts/HeaderAndFooterLayout/HeaderAndFooterLayout';
import { filterFilms } from '../../utils/FilterFilms'
import { formatLikedFilms, setLike } from '../../utils/likes'
import { MESSAGES, CARD_COUNT, CARD_BRAKEPOINT, SHORT_DURATION } from '../../utils/constants'
import { useCardCount } from '../../hooks/useCardCount'

function Movies({ requestAllFilms, requestLikeFilms, handleClickLikeButton, setIsShowMenu, filmsLocal, searchQueryMoviesLocal }) {

  // Фильмы
  const [allFilms, setAllFilms] = useState(null)
  const [likedFilms, setLikedFilms] = useState(null)
  const [filtredFilms, setFiltredFilms] = useState(null)
  const [displayedFilms, setDisplayedFilms] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [queryValues, setQueryValues] = useState(null)
  const { countAddFilms, startCountFilms, setParamsCountFilms } = useCardCount(CARD_COUNT, CARD_BRAKEPOINT)

  useEffect(() => {
    setParamsCountFilms('all')
    window.addEventListener('resize', setParamsCountFilms)
    return () => window.removeEventListener('resize', setParamsCountFilms)
  }, [setParamsCountFilms])

  // Загрузить фильмы с локального хранилища
  useEffect(() => {
    if (likedFilms && !isLoading) {
      const localFilms = filmsLocal.load()
      setFiltredFilms(localFilms)
    }
  }, [likedFilms, isLoading, filmsLocal])

  // Отфильтровать фильмы
  useEffect(() => {
    if (allFilms?.length && queryValues) {
      const films = filterFilms(allFilms, SHORT_DURATION, queryValues)
      filmsLocal.save(films)
      setFiltredFilms(films)

      films?.length ? hideErrorMessage() : showErrorMessage(MESSAGES.NOT_FOUND)
    }
  }, [allFilms, filmsLocal, queryValues])

  // Отобразить фильмы
  useEffect(() => {
    if (filtredFilms?.length) {
      const films = setLike(filtredFilms, likedFilms)
      setDisplayedFilms([...films.slice(0, startCountFilms)])
    }
  }, [filtredFilms, likedFilms, startCountFilms])

  useEffect(function getLikeFilms(){
    startLoader()
    requestLikeFilms()
      .then(films => {
        setLikedFilms(formatLikedFilms(films))
        hideErrorMessage()
      })
      .catch(() => {
        showErrorMessage(MESSAGES.ERROR)
      })
      .finally(() => {
        stopLoader()
      })
  }, [requestLikeFilms])

  function getAllFilms() {
    startLoader()
    requestAllFilms()
      .then(films => {
        setAllFilms(films)
        hideErrorMessage()
      })
      .catch(() => {
        showErrorMessage(MESSAGES.ERROR)
      })
      .finally(() => {
        stopLoader()
      })
  }

  function searchFilms(values) {
    if (!allFilms?.length) getAllFilms()
    setQueryValues(values)
  }

  function startLoader() {
    setIsLoading(true)
  }

  function stopLoader() {
    setIsLoading(false)
  }

  function showMoreFilms() {
    const startIndex = displayedFilms.length
    const endIndex = startIndex + countAddFilms

    setDisplayedFilms([...displayedFilms, ...filtredFilms.slice(startIndex, endIndex)])
  }

  function showErrorMessage(message) {
    setErrorMessage(message)
  }

  function hideErrorMessage() {
    setErrorMessage(null)
  }

  return (
    <HeaderAndFooterLayout
      setIsShowMenu={setIsShowMenu}
    >
      <div className="movies">
        <div className="container movies__container">
          <SearchForm
            searchFilms={searchFilms}
            searchQueryLocal={searchQueryMoviesLocal}
          />
          <MoviesCardList
            films={displayedFilms}
            isLoading={isLoading}
            message={errorMessage}
            handleClickLikeButton={handleClickLikeButton}
          />
          {filtredFilms
            && filtredFilms?.length > 3
            && filtredFilms?.length !== displayedFilms?.length
            && <button
              className="movies__more-button"
              type='button'
              onClick={() => showMoreFilms()}
            >Ещё</button>}
        </div>
      </div >
    </HeaderAndFooterLayout>
  );
}

export default Movies;