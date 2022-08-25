import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio'
import photo from '../../images/photo.jpg'

function AboutMe() {
  return (
    <section className="about-me" id='about-me'>
      <div className="container about-me__container">
        <h3 className="title about-me__title">Студент</h3>
        <div className="about-me__wrapper">
          <div className="about-me__description">
            <p className="about-me__name">Илья</p>
            <p className="about-me__speciality">Фронтенд-разработчик, 48 лет</p>
            <p className="about-me__text">Я из Самары, у меня два высших образования. Женат, двое детей.
              Работаю дизайнером и верстальщиком. Пошёл на курс веб разработки чтобы верстать сайты.
            </p>
            <ul className="about-me__links">
              <li><a className="about-me__link" href="https://vk.com/id266103558" target="_blank" rel="noreferrer">BK</a></li>
              <li><a className="about-me__link" href="https://github.com/Ilya-Cherevko" target="_blank" rel="noreferrer">Github</a></li>
            </ul>
          </div>
          <img className="about-me__photo" src={photo} alt="Моё фото" />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;
