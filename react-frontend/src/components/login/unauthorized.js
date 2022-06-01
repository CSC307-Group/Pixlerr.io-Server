import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>Invalid username or Password, please try again.</p>
            <div className="flexGrow">
            <Link to="/Login">
                <button onClick={goBack}>Go Back</button>
                </Link>
            </div>
        </section>
    )
}

export default Unauthorized