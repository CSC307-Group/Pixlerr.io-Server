import { React, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const userhost = 'http://localhost:5000/logout';
const userhost1 = 'http://localhost:5000/users';
export default function Signout() {
    const [loggedIn, setLogin] = useState({ _id: "", pixelTime: "" });
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