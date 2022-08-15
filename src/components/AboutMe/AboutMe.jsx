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
            <p className="about-me__specialization">Фронтенд-разработчик, 48 лет</p>
            <p className="about-me__text">Я родился и живу в Самаре, имею два высших образования. Женат, двое детей.
              Больше двадцати лет работаю дизайнером и верстальщиком полиграфии. Начинал работать в газете "Из рук в руки". Пошёл на курс веб разработки что бы верстать сайты.
            </p>
            <ul className="about-me__links">
              <li><a className="about-me__link" href="https://vk.com/id266103558" target="_blank">BK</a></li>
              <li><a className="about-me__link" href="https://github.com/Ilya-Cherevko" target="_blank">Github</a></li>
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
