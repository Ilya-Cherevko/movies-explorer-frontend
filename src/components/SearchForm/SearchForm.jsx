import './SearchForm.css';

function SearchForm({ isShort, setIsShort, searchQuery, setSearchQuery, searchFilms }) {
  return (
    <section className="search">
      <form className="search__form from-search" onSubmit={searchFilms}>
        <div className="from__ellips">
          <input
            className="from-search__input"
            type="text"
            placeholder='Фильм'
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
          />
          <button className="from-search__button" type="button"></button>
        </div>
        <label className="from-search__label" >
          <p className="form-search__label-text">Короткометражки</p>
          <input
            className="from-search__checkbox"
            type="checkbox"
            checked={isShort}
            onChange={() => setIsShort(!isShort)}
          />
          <div className="from-search__custom-checkbox">
            <div className="from-search__custom-mark"></div>
          </div>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;
