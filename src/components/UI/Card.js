import styled from "styled-components";
import CardInfo from "./CardInfo";

export const ModalWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CardWrapper = styled.div`
  display: flex;
  width: 1024px;
  height: 615px;
`


const PhotoWrapper = styled.div`
  height: 615px;
  width: 615px;
  background: url(${props => {
    if (props.hasOwnProperty('photo') && props.photo) {
      return props.photo
    } else {
      return "https://i.trademc.org/collections/items/_default.svg"
    }
  }}) no-repeat;
  background-size: cover;
`
function Card(props) {
    return <ModalWrapper onClick={() => {props.setModalView(false)}}>
        <CardWrapper>
            <CardInfo items={props.items} setItems={props.setItems} profile={props.profile} obj={props.obj}></CardInfo>
            <PhotoWrapper photo={props.obj.photofilename}></PhotoWrapper>
        </CardWrapper>
    </ModalWrapper>
 }

export default Card;