import styled from "styled-components";
import {Fragment, useState} from "react";
import Card from "./Card";

const MiniCardWrapper = styled.div`
  height: 300px;
  width: 300px;
  margin: 10px;
  display: flex;
  align-items: end;
  background: url(${props => {
      if (props.hasOwnProperty('photo') && props.photo) {
          return props.photo
      } else {
          return "https://i.trademc.org/collections/items/_default.svg"
      }
  }});
`

const InfoWrapper = styled.div`
  height: 70px;
  width: 100%;
  padding: 5px 5px 5px 20px;
  background-color: black;
  line-height: 12px;
  color: white;
`


const PriceWrapper = styled.h1`
  font-size: 14px;
`

const TitleWrapper = styled.h1`
  font-size: 24px;
`

function MiniCard(props) {
    const [modalView, setModalView] = useState(false);

    const price = `${props.obj.penniesprice / 100}$`

    let modal;

    if (modalView) {
        modal = <Card setItems={props.setItems} profile={props.profile} obj={props.obj} setModalView={setModalView}></Card>
    } else {
        modal = <Fragment></Fragment>
    }

    return <Fragment><MiniCardWrapper photo={props.obj.photofilename}  onClick={() => {
        setModalView(true);
    }
    }>
        <InfoWrapper>
            <TitleWrapper>{props.obj.name}</TitleWrapper>
            <PriceWrapper>{price}</PriceWrapper>
        </InfoWrapper>
    </MiniCardWrapper>
        {modal}
    </Fragment>
}

export default MiniCard;