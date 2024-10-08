import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/Logo.png";
import { useSelector } from "react-redux";
import {logout} from "../services/operations/authAPI"
import { useDispatch } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import Profile from "./Profile"
import { useState } from "react";

// import { apiConnector } from "../services/apiConnector";

const  Navbar=()=>{
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [profileState, setProfileState]=useState(false);
    
    const {token}=useSelector((state)=>state.auth);
    // console.log("token from navbar: ", token);
    // const {user}=useSelector((state)=>state.profile);
    // console.log("user from navbar: ", user);
    
    
    const logoutHandler=()=>{
        dispatch(logout(navigate));
    }
 
    return (
        <div className="w-full flex bg-richblack-900 fixed h-14 z-10">
            <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto  ">
            <Link to="/">
                <img src={logo} alt="Logo" width={240} height={32} loading="lazy"/>
            </Link>

            <nav>
                <ul className="flex gap-x-6 text-white font-bold">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    
                </ul>
            </nav>

            <div className="flex items-center gap-x-4">
                { token===null  &&
                    <Link to="/login">
                        <button className=" bg-gray-700 text-white font-bold py-[8px] px-[12px] rounded-[8px] border border-gray-400">
                            Login
                        </button>
                    </Link>
                }
                { token===null &&
                    <Link to="/signup">
                        <button className=" bg-gray-700 text-white font-bold py-[8px] px-[12px] rounded-[8px] border border-gray-400">
                            Sign Up
                        </button>
                    </Link>
                }
                { token!==null &&
                    <button 
                        className=" bg-gray-700 text-white font-bold py-[8px] px-[12px] rounded-[8px] border border-gray-400"
                        onClick={logoutHandler}
                    >Logout</button>
        
                }
                { token!==null &&
                    <Link to="/dashboard">
                        <div className="flex gap-2">
                            <button className=" bg-gray-700 text-white font-bold py-[8px] px-[12px] rounded-[8px] border border-gray-400 ">
                                Dashboard
                                <button onClick={setProfileState(true)} >
                                    <FaCaretDown className="text-white"/>
                                </button>
                            </button>
                            
                            <div>
                                profileState &&(
                                    <div>
                                        <Profile/>
                                    </div>
                                )
                            </div>A
                        </div>
                    </Link>
                }
            </div>
        </div>
        </div>
    );
}

export default Navbar;