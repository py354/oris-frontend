import styled from "styled-components";
import {useCookies} from "react-cookie";
import profile from "../profile/Profile";
import axios from "axios";

export const InfoWrapper = styled.div`
  width: 409px;
  background-color: white;
  color: #333; 
  padding: 10px;
  line-height: 10px;
  
  
  h2 {
    margin-top: 50px;
    margin-bottom: 30px;
  }
  
  li {
    margin: 10px;
  }
  
  button {
    margin-top: 10px;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  button {
    appearance: none;
    border: 0;
    border-radius: 5px;
    background: #4676D7;
    color: #fff;
    padding: 8px 16px;
    font-size: 16px;
  }
`


function CardInfo(props) {
    console.log(props);
    const price = `${props.obj.penniesprice / 100}$`


    const [cookie, setCookie, ] = useCookies(['login', 'isadmin', 'basket', 'cart']);
    console.log(cookie);

    const buttons = [];
    let basket = cookie["basket"];
    if (basket && basket.includes(props.obj.id)) {
        buttons.push(["Удалить из корзины", event => {
            event.stopPropagation();
            setCookie("basket", basket.filter(item => item !== props.obj.id));
        }])
    } else {
        buttons.push(["Добавить в корзину", event => {
            event.stopPropagation();
            if (!basket) {
                basket = [];
            }
            basket.push(props.obj.id);
            setCookie("basket", basket);
        }])
    }

    if (props.profile) {
        // TODO
        // let cart = profile["cart"];
        // if (cart && cart.includes(props.obj.id)) {
        //     buttons.push(["Удалить из избранного", event => {
        //         event.stopPropagation();
        //         setCookie("cart", cart.filter(item => item !== props.obj.id));
        //     }])
        // } else {
        //     buttons.push(["Добавить в избранное", event => {
        //         event.stopPropagation();
        //         cart.push(props.obj.id);
        //         setCookie("cart", cart);
        //     }])
        // }

        if (props.profile["is_admin"]) {
            buttons.push(["Удалить товар", event => {
                const src = `http://127.0.0.1:5000/delete_item/`;
                axios.post(src, {
                    item_id: props.obj.id,
                }).then(data => {
                    if (data.data.result === "ok") {
                        alert("Успешно")
                        props.setItems(props.items.filter(item => item.id !== props.obj.id))
                    } else {
                        alert("Ошибка")
                    }
                })
            }])
        }
    }

    return <InfoWrapper>
        <h1>{props.obj.name}</h1>
        <h3>{price}</h3>
        <h2>{props.obj.description}</h2>
        <ButtonsWrapper>
            {buttons.map((obj, i) => <button key={i} onClick={obj[1]}>{obj[0]}</button>)}
        </ButtonsWrapper>
    </InfoWrapper>
}

export default CardInfo;