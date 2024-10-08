import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { colleges } from "../../src/services/operations/authAPI"
import CollegeTable from "./CollegeTable"

function StudentInput() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [collegeData, setcollegeData]=useState([]);

    const [formData, setFormData] = useState({
        percentile: "",
        category: "",
        branch: "",
    })

    function changeHandler(event) {
        setFormData((prevData) => (
            {
                ...prevData, [event.target.name]: event.target.value
            }
        ))
    }

    async function submitHandler(event) {
        event.preventDefault();
         try{
            const data= await dispatch(colleges(formData));
            if (data) {
                console.log("data received from colleges API function", data);
                setcollegeData(data); // Update the state with the fetched college data
              } else {
                console.log("No data received or API request failed");
              }
         }catch (error) {
            console.error("Error fetching college data", error);
          }
    }
    return (
        <div>
            {
                !collegeData.length>0 && 
                (<form onSubmit={submitHandler}
            className="flex flex-col w-3/12  mx-auto gap-y-4 mt-20 h-screen">
            <label className="w-full">
                <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                    Percentiles<sup className=" text-pink-600">*</sup>
                </p>
                <input
                    required
                    type="string"
                    value={formData.percentile}
                    name="percentile"
                    onChange={changeHandler}
                    placeholder="Enter Percentiles"
                    className=" bg-gray-600 rounded-[0.5rem] text-richblack-800 w-full p-[12px]"
                />
            </label>

            <label className="w-full">
                <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                    Branch<sup className="text-pink-600">*</sup>
                </p>
                <select
                    required
                    value={formData.branch}
                    name="branch"
                    onChange={changeHandler}
                    className="bg-gray-600 rounded-[0.5rem] text-richblack-800 w-full p-[12px]"
                >
                    <option value="" disabled>Select Branch</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Electronics &  telecommunication Enginnering">Electronics & Telecommunication Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Production Engineering">Production Engineering</option>
                </select>
            </label>


            <label className="w-full relative">
                <p className="text-[0.875rem] text-white mb-1 leading-[1.375rem]">
                    Category<sup className="text-pink-600">*</sup>
                </p>
                <select
                    required
                    value={formData.category}
                    name="category"
                    onChange={changeHandler}
                    className="bg-gray-600 rounded-[0.5rem] text-richblack-800 w-full p-[12px]"
                >
                    <option value="" disabled>Select Category</option>
                    <option value="GOPEN">GOPEN</option>
                    <option value="GOBC">GOBC</option>
                    <option value="NT1">NT1</option>
                    <option value="NT2">NT2</option>
                    <option value="NT3">NT3</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="TFWS">TFWS</option>
                </select>
            </label>



            <div className="flex justify-center items-center ">
                <button type="submit" className=" bg-yellow-50 rounded-[8px] font-semibold text-black px-[12px] py-[8px] mt-4 w-5/12 justify-center items-center">
                    Find Colleges
                </button>
            </div>

            <div className="flex  justify-center items-center">
                <Link to="/dashboard">
                    <button className=" bg-yellow-50 rounded-[8px] font-semibold text-black px-[12px] py-[8px] mt-2 justify-center items-center">
                        Back to Dashboard
                    </button>
                </Link>
            </div>
        </form>
                )
            }

        <div>
            {
                 collegeData.length>0 && (
                <div>
                    <CollegeTable collegeData={collegeData} category={formData.category}></CollegeTable> 
                    <Link to="/student-input" className="flex ml-5">
                        <button onClick={()=> {setcollegeData([])}} type="submit" className=" bg-yellow-50 rounded-[8px] font-semibold text-black px-[12px] py-[8px] mt-4 w-1/12 justify-center items-center">
                                Go Back
                        </button>
                    </Link>
                </div>
                 )
            }
        </div>
        </div>
    );
}

export default StudentInput;