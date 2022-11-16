import {useCookies} from "react-cookie";
import Authorization from "./Authorization";
import {useEffect, useState} from "react";
import Registration from "./Registration";
import axios from "axios";

function Profile() {
    const [cookie, setCookie, ] = useCookies(['login', 'isadmin', 'basket', 'cart']);
    const [authorizationStatus, setAuthorizationStatus] = useState(true)

    const [profile, setProfile] = useState({});
    useEffect(() => {
        const src = `http://127.0.0.1:5000/get_account_info/`;
        axios.get(src).then(data => {
            if (data.data.result === "ok") {
                setProfile(data.data.data);
            }
        })
    }, [])

    if (!cookie['id'] || !profile.hasOwnProperty('login')) {
        if (authorizationStatus) {
            return <Authorization setCookie={setCookie} setRegistration={() => setAuthorizationStatus(false)}></Authorization>
        } else {
            return <Registration setCookie={setCookie} setAuthorization={() => setAuthorizationStatus(true)}></Registration>
        }
    }


    return <h1>Приветствую, {profile['is_admin'] === 'true' ? 'админ ' : ''}{profile['login']}! </h1>
    // TODO ПРОФИЛЬ
}

export default Profile;