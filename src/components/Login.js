import React from 'react';

function Login(props) {
    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form action="#" name="login-form" className= "login__form" onSubmit={props.onSubmit} >
                <input type="email" name="email" className="login__input login__input_type_email"
                    placeholder="Email" /*onChange={handleChangeEmail}*/  />
                <input type="text" name="password" className="login__input login__input_type_password"
                    placeholder="Пароль" /*onChange={handleChangePassword} */  />
                <button type="submit" className="login__submit-button">Войти</button>
            </form>
        </div>
    );
}

export default Login;