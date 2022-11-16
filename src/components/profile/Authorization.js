import ContentWrapper from "../UI/Content";
import styled from "styled-components";
import {useState} from "react";
import axios from "axios";

export const AuthorizationWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: auto;
  text-align: center;
  font-size: 16px;
  
  .authorizationForm {
    margin: auto;
    border-radius: 10px;
    padding: 10px;
    background-color: #D9D9D9;
  }
  
  form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: auto;
  }
  
  input {
    width: 250px;
  }
  
  input[type="submit"] {
    width: 100%;
  }
  
  label {
    display: flex;
    justify-content: space-between;
  }
  
  a {
    font-size: 12px;
    margin: auto;
    text-decoration: underline;
  }
  
  a:hover {
    text-decoration: none;
  }
`

function Authorization(props) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    function loginHandler(event) {
        setLogin(event.target.value);
    }

    function passwordHandler(event) {
        setPassword(event.target.value);
    }

    function submitHandler(event) {
        event.stopPropagation();
        event.preventDefault();

        if (login.length < 6 || login.length > 20) {
            alert("Длина логина должна быть от 6 до 20");
            return;
        }

        if (password.length < 6 || password.length > 100) {
            alert("Длина пароля должна быть от 6 до 100");
            return;
        }

        const src = "http://127.0.0.1:5000/auth/"
        axios.post(src, {
            'login': login,
            'password': password
        }).then(data => {
            console.log(data)
            if (data.data.result === 'bad') {
                alert("Форма заполнена неверно")
            } else if (data.data.result === 'not_found') {
                alert("Неверный логин или пароль")
            } else if (data.data.result === 'ok') {
                alert("Авторизация прошла успешно")
                for (const key in data.data.data) {
                    props.setCookie(key, data.data.data[key])
                }
            }
        })
    }

    return <ContentWrapper>
        <h1>Авторизация</h1>
        <AuthorizationWrapper>
            <div className={"authorizationForm"}>
                <form onSubmit={submitHandler}>
                    <label>Логин: <input type={"text"} value={login} onChange={loginHandler}/></label>
                    <label>Пароль: <input type={"password"} value={password} onChange={passwordHandler}/></label>
                    <input type={"submit"} value={"Войти"}/>
                </form>
            </div>
            <a href="" onClick={props.setRegistration}>Регистрация</a>
        </AuthorizationWrapper>
    </ContentWrapper>
}

export default Authorization;