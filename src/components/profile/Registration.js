import ContentWrapper from "../UI/Content";
import {AuthorizationWrapper} from "./Authorization";
import {useState} from "react";
import axios from "axios";

function Registration(props) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')

    function loginHandler(event) {
        setLogin(event.target.value);
    }

    function passwordHandler(event) {
        setPassword(event.target.value);
    }

    function secondPasswordHandler(event) {
        setSecondPassword(event.target.value);
    }

    function submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        if (login.length < 6 || login.length > 20) {
            alert("Длина логина должна быть от 6 до 20");
            return;
        }

        if (password.length < 6 || password.length > 100) {
            alert("Длина пароля должна быть от 6 до 100");
            return;
        }

        if (password !== secondPassword) {
            alert("Пароли не совпадают")
            return;
        }

        const src = "http://127.0.0.1:5000/registration/"
        axios.post(src, {
            'login': login,
            'password': password
        }).then(data => {
            console.log(data)
            if (data.data.result === 'bad') {
                alert("Форма заполнена неверно")
            } else if (data.data.result === 'already_exist') {
                alert("Данный логин уже занят")
            } else if (data.data.result === 'ok') {
                alert("Регистрация прошла успешно")
                console.log(data)
            }
        })
    }

    return <ContentWrapper>
        <h1>Регистрация</h1>
        <AuthorizationWrapper>
            <div className={"authorizationForm"}>
                <form onSubmit={submitHandler}>
                    <label>Логин: <input type={"text"} value={login} onChange={loginHandler}/></label>
                    <label>Пароль: <input type={"password"} value={password} onChange={passwordHandler}/></label>
                    <label>Повторите: <input type={"password"} value={secondPassword} onChange={secondPasswordHandler}/></label>
                    <input type={"submit"} value={"Зарегистрироваться"}/>
                </form>
            </div>
            <a href="" onClick={props.setAuthorization}>Авторизация</a>
        </AuthorizationWrapper>
    </ContentWrapper>
}

export default Registration;