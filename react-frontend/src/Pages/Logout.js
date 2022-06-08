import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userhost = 'http://localhost:5000/Logout';
const userhost1 = 'http://localhost:5000/users';
export default function Signout() {
    let nav = useNavigate();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        axios({
            method: "DELETE",
            withCredentials: true,
            url: userhost,
        }).then((res) => {
            console.log("test");

        });
    };
    
    useEffect(() => {
        fillUserStates();
    }, []);

    const fillUserStates = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: userhost1,
        }).then((res) => {
            console.log(res.data)
            nav('/');
        });
    };
}