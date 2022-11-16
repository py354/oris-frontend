import axios from 'axios'
import styled from "styled-components";
import {useEffect, useState} from "react";
import MiniCard from "../UI/MiniCard";
import ContentWrapper, {ItemsWrapper} from "../UI/Content";


const ServerSelectorsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ServerSelectorWrapper = styled.div`
  width: 300px;
  text-align: center;
  padding: 10px;
  background-color: ${props => {
    if (props.isSelected) {
      return "#8A8A8A"
    } else {
      return "#D9D9D9"
    }
  }};
  border: 1px black solid;
`



function Shop() {
    const [server, setServer] = useState(1);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const src = `http://127.0.0.1:5000/items/${server}/`;
        axios.get(src).then(data => {
            setItems(data.data);
        })
    }, [server])

    const [profile, setProfile] = useState({});
    useEffect(() => {
        const src = `http://127.0.0.1:5000/get_account_info/`;
        axios.get(src).then(data => {
            if (data.data.result === "ok") {
                setProfile(data.data.data);
            }
        })
    }, [])

    return <ContentWrapper>
        <h1>Магазин</h1>
        <ServerSelectorsWrapper>
            <ServerSelectorWrapper isSelected={server === 1} onClick={() => {setServer(1)}}>Сервер 1</ServerSelectorWrapper>
            <ServerSelectorWrapper isSelected={server === 2} onClick={() => {setServer(2)}}>Сервер 2</ServerSelectorWrapper>
            <ServerSelectorWrapper isSelected={server === 3} onClick={() => {setServer(3)}}>Сервер 3</ServerSelectorWrapper>
        </ServerSelectorsWrapper>
        <ItemsWrapper>
            {items.map((item, i) => <MiniCard items={items} setItems={setItems} profile={profile} obj={item} key={i}/>)}
        </ItemsWrapper>
    </ContentWrapper>
}
export default Shop;