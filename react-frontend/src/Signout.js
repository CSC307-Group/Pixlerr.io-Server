import { React, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

const userhost = 'http://localhost:5000/logout';
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
}