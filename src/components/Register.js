import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    return (
        <div className="login">
            <h2 className="login__title">Регистрация</h2>
            <form action="#" name="login-form" className= "login__form" onSubmit={props.onSubmit} >
                <input type="email" name="email" className="login__input login__input_type_email"
                    placeholder="Email" /*onChange={handleChangeEmail}*/  />
                <input type="password" name="password" className="login__input login__input_type_password"
                    placeholder="Пароль" /*onChange={handleChangePassword} */  />
                <button type="submit" className="login__submit-button">Зарегистрироваться</button>
            </form>
            <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
        </div>
    );
}

export default Register;