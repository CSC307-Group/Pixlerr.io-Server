import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const userhost = process.env.REACT_APP_BACKEND_URL + "/Logout";

function Logout() {
  const nav = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios({
      method: "DELETE",
      withCredentials: true,
      url: userhost,
    }).then((res) => {
      console.log(res);
      if (res.data === "Logged Out") {
        nav("/");
      }
    });

    
  };
}

export default Logout;
