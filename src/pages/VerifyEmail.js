import { useState } from "react";
import { useNavigate } from "react-router";
import { signup } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";

function VerifyEmail({formData}) {
  const [otp, setOtp] = useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const finalData={
    ...formData, otp
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("Prititng Fianladata",finalData);
    dispatch(signup(finalData, navigate))
  };

  return (

    //onSubmit={submitHandler}
    <form className="flex flex-col mt-6">
      <label htmlFor="otp" className="text-white text-sm font-medium mb-2">
        Enter OTP
      </label>
      <input
        type="text"
        id="otp"
        name="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter your OTP"
        className="px-4 py-2 rounded-lg bg-gray-800 text-black border border-gray-600 focus:outline-none"
        required
      />
      <button 
        type="submit" onClick={submitHandler}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 mt-4 rounded-lg">
        Verify OTP
      </button>
    </form>
  );
}

export default VerifyEmail;
