import { useEffect } from "react";
import axios from "axios";

const userhost = "http://localhost:5000/logout";
function Logout() {

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

export default Logout;
