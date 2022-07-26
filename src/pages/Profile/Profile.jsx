import { useEffect } from "react";
import './Profile.css';
import HeaderLayout from "../../layouts/HeaderLayout/HeaderLayout";
import { useFormWithValidation } from '../../hooks/useFormWithValidation'
import { VALIDATION_PARAMS } from '../../utils/constants'

function Profile({ handleUpdateUser, currentUser, handleSignOut, setIsShowMenu }) {
  const startValues = {
    name: currentUser.name,
    email: currentUser.email
  }

  const { values, isValid, handleChange, setIsValid } = useFormWithValidation(startValues)

  // Проверить что данные изменились и валидны
  useEffect(() => {
    const isValidName = VALIDATION_PARAMS.REGEX.NAME.test(values.name)
    const isValidEmail = VALIDATION_PARAMS.REGEX.EMAIL.test(values.email)
    const isChangeName = values.name !== currentUser.name
    const isChangeEmail = values.email !== currentUser.email

    isValidName && isValidEmail && (isChangeName || isChangeEmail)
      ? setIsValid(true)
      : setIsValid(false)
  }, [currentUser.email, currentUser.name, setIsValid, values])

  function clickUpdateButton() {
    handleUpdateUser(values)
      .then(() => setIsValid(false))
  }

  function clickSignOutButton() {
    handleSignOut()
  }

  return (
    <HeaderLayout
      setIsShowMenu={setIsShowMenu}
    >
      <div className="profile">
        <div className="container profile__container">
          <div className="profile__wrapper">
            <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
            <form className="profile__form">
              <label className='profile__label'>
                <p className="profile__text">Имя</p>
                <input
                  className="profile__input"
                  type="text"
                  value={values.name}
                  name="name"
                  onInput={handleChange}
                  required
                  placeholder="Ваше имя"
                />
              </label>
              <label className='profile__label'>
                <p className="profile__text">E-mail</p>
                <input
                  className="profile__input"
                  type="email"
                  value={values.email}
                  name="email"
                  onInput={handleChange}
                  required
                  placeholder="Ваш E-mail"
                />
              </label>
            </form>
            <div className="profile__buttons">
              <button
                className={
                  isValid
                    ? 'profile__button'
                    : 'profile__button profile__button_disabled'
                }
                type="button"
                onClick={clickUpdateButton}
                disabled={!isValid}
              >Редактировать</button>
              <button
                className='profile__button profile__button_color_pink'
                type="button"
                onClick={clickSignOutButton}
              >Выйти из аккаунта</button>
            </div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
}

export default Profile;
