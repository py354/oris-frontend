import {ModalWrapper} from "../UI/Card";
import styled from "styled-components";
import {useState} from "react";
import axios from "axios";

const AddItemWrapper = styled.div`
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
`

function AddItem(props) {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [photo, setPhoto] = useState('')
    const [server, setServer] = useState(props.server)

    function serverHandler(event) {
        setServer(event.target.value);
    }
    function nameHandler(event) {
        setName(event.target.value);
    }
    function descHandler(event) {
        setDesc(event.target.value);
    }

    function priceHandler(event) {
        setPrice(event.target.value);
    }

    function photoHandler(event) {
        setPhoto(event.target.value);
    }

    function prevent(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function submitHandler(event) {
        prevent(event)
        const src = "http://127.0.0.1:5000/add_item/"
        axios.post(src, {
            'server': server,
            'name': name,
            'price': price,
            'desc': desc,
            'photo': photo,
        }).then(data => {
            console.log(data)
            if (data.data.result === 'bad') {
                alert("Форма заполнена неверно")
            } else if (data.data.result === 'ok') {
                alert("Товар добавлен")
                console.log(data)
            }
        })
    }

    return <ModalWrapper onClick={() => {props.setModalView(false)}}>
        <AddItemWrapper>
            <div className={"authorizationForm"}>
                <form onSubmit={submitHandler}>
                    <input onClick={prevent} type={"hidden"} value={server} onChange={serverHandler}/>
                    <label onClick={prevent}>Название: <input type={"text"} value={name} onChange={nameHandler}/></label>
                    <label onClick={prevent}>Описание: <input type={"text"} value={desc} onChange={descHandler}/></label>
                    <label onClick={prevent}>Цена (в коп.): <input type={"number"} value={price} onChange={priceHandler}/></label>
                    <label onClick={prevent}>Картинка: <input type={"text"} value={photo} onChange={photoHandler}/></label>
                    <input onClick={submitHandler} type={"submit"} value={"Создать"}/>
                </form>
            </div>
        </AddItemWrapper>
    </ModalWrapper>
}

export default AddItem;