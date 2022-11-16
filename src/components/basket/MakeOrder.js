import {ModalWrapper} from "../UI/Card";
import {InfoWrapper} from "../UI/CardInfo";
import {FlexCenterWrapper} from "../UI/Content";
import styled from "styled-components";


const MakeOrderButton = styled.button`
  width: 100%;
  text-align: center;
  padding: 10px;
  background-color: #D9D9D9;
  border: 1px black solid;
`
function MakeOrder(props) {
    console.log('wtf', props);



    let sum = 0;
    let list = props.items.map((elem, i) => {
        const price = `${elem.penniesprice / 100}$`;
        sum += elem.penniesprice;
        return <li key={i}>{elem.name} за {price}</li>
    })

    // TODO 1) Обработка 2) Ввод Email?

    return <ModalWrapper onClick={() => {props.setModalView(false)}}>
        <InfoWrapper>
            <h1>Оформление заказа</h1>
            <h2>Выбранные товары:</h2>
            <ol>{list}</ol>
            <p>Итого: {sum / 100}$</p>
            <label onClick={event => event.stopPropagation()}>Email: <input type={"text"}/></label>
            <FlexCenterWrapper><MakeOrderButton>Оформить заказ</MakeOrderButton></FlexCenterWrapper>
        </InfoWrapper>
    </ModalWrapper>
}

export default MakeOrder;