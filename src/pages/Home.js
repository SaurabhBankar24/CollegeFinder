// import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import Cards from "../components/core/HomePage/Cards";
import CTAButton from "../components/core/HomePage/CTAButton";
import HighlightText from "../components/core/HomePage/HighlightText";
import data from "../data";

function Home(){
    const [cards,setCards] = useState(data);

    return (
        <div>
            
            {/* Section1 */}
            <div className="w-full bg-richblack-800">
                <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-center  h-screen overflow-hidden text-white font-bold">

                {/* Title */}
                <div className="flex flex-row gap-2 text-center text-5xl font-bold">
                    Predict Your
                    <HighlightText text={"Future"}/>
                </div>

                {/* Description */}
                <div className="mt-4 w-[60%] text-center text-lg font-bold text-richblack-300">
                We predict best colleges based on your percentile and guide you throughout the admission process in Maharashtra(MHT-CET)
                </div>

                {/* Get Started */}
                <div className="mt-4">
                    <CTAButton active={true} linkto={"/login"}>
                        <div className="flex items-center gap-2">
                            Get Started
                            {/* <FaArrowRight/> */}
                        </div>
                    </CTAButton>
                </div>

            </div>
            </div>

            {/* Section2 */}
            <div className="bg-richblack-25 text-richblack-700 h-screen">

                {/* Title */}
                <div className="texture h-[200px] flex flex-row gap-2 text-center text-5xl font-bold justify-center items-center">
                    Top Colleges in
                    <HighlightText text={"Maharashtra"}/>
                </div>

                {/* Cards */}
                <Cards cards={cards}/>

            </div>

            {/* Footer */}
            
        </div>
    );
}

export default Home;