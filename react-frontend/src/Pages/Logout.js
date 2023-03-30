import { useNavigate } from "react-router-dom";

function Logout(props) {
  const { setActiveUser, setLoginStatus } = props;
  setActiveUser({ _id: "", pixelTime: "" });
  setLoginStatus(false);
  useNavigate("/");
}

export default Logout;
