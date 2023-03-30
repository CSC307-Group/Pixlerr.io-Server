import { useNavigate } from "react-router-dom";

function Logout(props) {
  const { setActiveUser, setLoginStatus } = props;
  const nav = useNavigate();
  
  setActiveUser({ _id: "", pixelTime: "" });
  setLoginStatus(false);
  nav("/");
}

export default Logout;
