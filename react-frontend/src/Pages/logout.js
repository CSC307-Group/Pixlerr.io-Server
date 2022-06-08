import { Link } from "react-router-dom";

const Logout = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/logout", "_self");
  };
  return (
    <div className="navbar">

        <li className="listItem" onClick={logout}>
            Logout
            </li>
    </div>
  );
};

export default Logout;