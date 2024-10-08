
import CTAButton from "../components/core/HomePage/CTAButton"
import { useSelector } from "react-redux";
import Profile from "../components/Profile"

function Dashboard(){

    return (
        <div className="flex flex-col justify-center items-center h-screen text-white font-bold">
            <p>Welcome to CollegeFinder</p>


            {/* <Profile></Profile> */}
            <div className="mt-4">
                    <CTAButton active={true} linkto={"/student-input"}>
                        <div className="flex items-center gap-2">
                            Find Colleges
                            {/* <FaArrowRight/> */}
                        </div>
                    </CTAButton>
                </div>
        </div>
        
    );
}

export default Dashboard;