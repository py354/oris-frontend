import ContentWrapper, {FlexCenterWrapper, ItemsWrapper} from "../UI/Content";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import MiniCard from "../UI/MiniCard";
import styled from "styled-components";
import MakeOrder from "./MakeOrder";


const MakeOrderButton = styled.button`
  width: 300px;
  text-align: center;
  padding: 10px;
  background-color: #D9D9D9;
  border: 1px black solid;
`

function Basket() {
    const [showOrder, setShowOrder] = useState(false);
    const [items, setItems] = useState([]);
    const [cookies, , ] = useCookies(['basket'])

    useEffect(() => {
        const src = `http://127.0.0.1:5000/items/`;
        axios.post(src, {
            ids: cookies['basket'],
        }).then(data => {
            setItems(data.data);
        })

    }, [cookies])

    let action;
    if (items.length) {
        action = <MakeOrderButton onClick={() => {setShowOrder(true)}}>Оформить заказ</MakeOrderButton>
    } else {
        action = <p>На данный момент корзина пуста</p>
    }

    let showOrderComponent;
    if (showOrder) {
        showOrderComponent = <MakeOrder setModalView={setShowOrder} items={items}></MakeOrder>
    } else {
        showOrderComponent = <Fragment></Fragment>
    }



    return <ContentWrapper>
        <h1>Корзина</h1>
        <ItemsWrapper>
            {items.map((item, i) => <MiniCard obj={item} key={i}/>)}
        </ItemsWrapper>
        <FlexCenterWrapper>{action}</FlexCenterWrapper>
        {showOrderComponent}
    </ContentWrapper>
}

export default Basket;