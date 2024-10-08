
import toast from "react-hot-toast"

import {setLoading, setToken} from "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    COLLEGES_API,
}=endpoints

export function sendOtp(email, navigate, setcardState){
    return async(dispatch)=>{
        const toastID=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent:true,
            })
            //console.log("SendOTP respose...", response);
            //console.log(response.data.success);
            if(!response.data.success){
                toast.error(response.data.message)
                throw new Error(response.data.message);
            }

            toast.success("OTP Sent Successfully...");
            // navigate("/verify-email");
        }catch(error){
              console.log("SENTOTP API Error...", error.response.data.message);
              toast.error(error.response.data.message);
              setcardState(false);
              
        }
        dispatch(setLoading(false));
        toast.dismiss(toastID);
        setcardState(true);
    }
}

export function login(email, password, navigate){
    return async (dispatch)=>{
        const toastID=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response=await apiConnector("POST", LOGIN_API, {
                email, password,
            });
            console.log("LOGIN_API response.....", response);

            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }

            const token=response.data.token;
            const user=response.data.user;
            console.log("from authAPI",token);
            console.log("from authAPI", user);
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(setToken(token))
            dispatch(setUser(user))

            toast.success("Login Successfull...");
            navigate("/dashboard");
        }catch(error){
            if(error.message==="Password is incorrect"){
                console.log("LOGIN_API_ERROR", error);
                toast.error(error.message);
            }else{
                // console.log("LOGIN_API_ERROR", error);
                console.log("LOGIN_API_ERROR", error.response.data.message);
                toast.error(error.response.data.message);
            }
            dispatch(setLoading(false));
            toast.dismiss(toastID); 
        }finally{
            dispatch(setLoading(false));
            toast.dismiss(toastID);
        }
    }
}

export function signup(finalData, navigate){
    return async (dispatch)=>{
        const toastID=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const {accountType, 
                firstName, 
                lastName, 
                email, 
                password, 
                confirmPassword, 
                otp
            }=finalData;

            // console.log("FinaData", finalData)

            const response=await apiConnector("POST", SIGNUP_API, {
                accountType, firstName, lastName, email, password, confirmPassword,otp,
            });
            //console.log("SIGNUP_API response.....", response);

            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }

            toast.success("Signup Successfull...");
            navigate("/login");
        }catch(error){
            console.log("SIGNUP_API_ERROR", error.response.data);
            toast.error(error.response.data.message);
            dispatch(setLoading(false));
            toast.dismiss(toastID);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastID);
    }

}

// getcollegeData
export function colleges( finalData, navigate){
    return async (dispatch)=>{
        const toastID=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const {percentile, branch, category}=finalData;

            console.log("FinaData", finalData)

            const response=await apiConnector("POST", COLLEGES_API, {
                percentile, branch, category,
            });
            console.log("COLLEGES_API response.....", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Data Got Successfull...");
            console.log("resposnse data" ,response.data.data);
            // navigate("/dashboard");
            return response.data.data;
        }catch(error){
            console.log("COLLEGES_API_ERROR", error);
            toast.error("Getting Data Failed...");
            return null;
        }finally{
            dispatch(setLoading(false));
            toast.dismiss(toastID);
        }
        
        
        
    }

}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setLoading(true));
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out");
        dispatch(setLoading(false));
        navigate("/");
    }
}