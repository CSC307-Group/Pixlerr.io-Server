// import { useRef, useState, useEffect, useContext, React } from 'react';
// import AuthContext from "../../context/Auth";
// import { useLocation, useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';

// import axios from '../../api/axios';
// const LOGIN_URL = '/users';


// const Login = () => {
//     const { setAuth } = useAuth();

//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/";

//     const userRef = useRef();
//     const errRef = useRef();

//     const [user, setUser] = useState('');
//     const [pwd, setPwd] = useState('');
//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState(false);

//     useEffect(() => {
//         userRef.current.focus();
//     }, [])

//     useEffect(() => {
//         setErrMsg('');
//     }, [user, pwd])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = axios.post(LOGIN_URL, 
//               JSON.stringify({user, pwd}),
//               {
//               headers:{"Content-Type" : "application/json"}
//               }
//               );
//             console.log(JSON.stringify(response?.data));
//             console.log(JSON.stringify(response));
//             const accessToken = response?.data?.accessToken;
//             const roles = response?.data?.roles;
//             setAuth({ user, pwd, roles, accessToken });
//             setUser('');
//             setPwd('');
//             setSuccess(true);
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response?.status === 400) {
//                 setErrMsg('Missing Username or Password');
//             } else if (err.response?.status === 401) {
//                 setErrMsg('Unauthorized');
//             } else {
//                 setErrMsg('Login Failed');
//             }
//             errRef.current.focus();
//         }
//     }

//     return (
//         <>
//             {success ? (
//                 <section>
//                     <h1>You are logged in!</h1>
//                     <br />
//                     <p>
//                         <a href="/">Go to Home</a>
//                     </p>
//                 </section>
//             ) : (
//                 <section>
//                     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//                     <h1>Sign In</h1>
//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="username">Username:</label>
//                         <input
//                             type="text"
//                             id="username"
//                             ref={userRef}
//                             autoComplete="off"
//                             onChange={(e) => setUser(e.target.value)}
//                             value={user}
//                             required
//                         />

//                         <label htmlFor="password">Password:</label>
//                         <input
//                             type="text"
//                             id="password"
//                             onChange={(e) => setPwd(e.target.value)}
//                             value={pwd}
//                             required
//                         />
//                         <button>Sign In</button>
//                     </form>
//                     <p>
//                         Need an Account?<br />
//                         <span className="line">
//                             <a href="/Signup">
//                               Sign Up
//                               </a>
//                         </span>
//                     </p>
//                 </section>
//             )}
//         </>
//     )
// }

// export default Login

import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../../api/axios';
const LOGIN_URL = '/users';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/Signup">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default Login