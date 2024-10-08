const CollegeCutoff = require("../models/CollegeCutoff")
const CollegeDescription = require("../models/CollegeDescription")

// addCollegeHandler
exports.addCollegeCutoffHandler = async (req, res) => {
    try {

        // fetch data
        const { collegeName,
            branch,
            about = "Not Avaialable",
            placementPercentage = "Not Avaialable",
            fees = "Not Avaialable"
        } = req.body;

        // Pending----------------- adding cutoffs 

        // validate data
        if (!collegeName || !branch) {
            return res.status(403).json({
                success: false,
                message: "Please Enter all details..."
            })
        }

        // check if college exist
        const college = await CollegeCutoff.findOne({ collegeName: collegeName, branch: branch });


        if (college) {
            // if college exist in database 
            return res.status(403).json({
                success: false,
                message: "College already added, if you want to update college details, use updateCollege Functionality",
            })
        } else {
            // if not create new entry in database
            // first create collegeDescription 
            const collegeDescription = await collegeDescription.create({
                about,
                placementPercentage, fees
            })

            // PEnding----------------- adding college cutoffs according to categories
            const college = await CollegeCutoff.create({
                collegeName,
                branch,
                collegeDescription: collegeDescription._id
            })
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "New College Added Successfully..."
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in adding new college in database..."
        })
    }
}




// updateCollegeHandler
exports.updateCollegeCutoffHandler = async (req, res) => {
    try {

        // fetch data
        const { collegeName, branch, } = req.body;

        // validate data
        if (!collegeName || !branch) {
            return res.status(403).json({
                success: false,
                message: "Please Enter all details..."
            })
        }

        // check if college exist
        const college = await CollegeCutoff.findOne({ collegeName: collegeName, branch: branch });


        if (college) {
            // if college exist in database 
            //first  create collegeDescription 
            college.collegeName = collegeName,
            college.branch = branch

            // --------------------Pending adding cutoff according to categories

        } else {
            // if college not exist in database 
            return res.status(403).json({
                success: false,
                message: "College does not exist in database, if you want to add college details, use addCollege Functionality",
            });
        }

        return res.status(200).json({
            success: true,
            message: "College Cutoff updated Successfully..."
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in updating college cutoffs in database..."
        })
    }
}


exports.updateCollegeDescriptionHandler = async (req, res) => {
    try {

        // fetch data
        const { collegeName,
            branch,
            about = "Not Avaialable",
            placementPercentage = "Not Avaialable",
            fees = "Not Avaialable"
        } = req.body;

        // validate data
        if (!collegeName || !branch) {
            return res.status(403).json({
                success: false,
                message: "Please Enter all details..."
            })
        }

        // check if college exist
        const college = await CollegeCutoff.findOne({ collegeName: collegeName, branch: branch });


        if (college) {
            // if college exist in database find collegeDescription id 
            const collegeDescriptionID = college.collegeDescription._id;

            // using collegeDescriptionID update College Description
            const collegeDescriptionDetails = await CollegeCutoff.findOne({ collegeDescriptionID });

            if(collegeDescriptionDetails){
                collegeDescriptionDetails.about=about;
                collegeDescriptionDetails.placementPercentage=placementPercentage;
                collegeDescriptionDetails.fees=fees;
            }else{
                //   if collegeDescription does not exist then create new entry
                    const collegeDescription=await CollegeDescription.create({
                        about, placementPercentage, fees
                    })
            }


        } else {
            // if college not exist in database 
            return res.status(403).json({
                success: false,
                message: "College not exist in database....",
            });
        }

        return res.status(200).json({
            success: true,
            message: "College Description updated Successfully..."
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in updating college description in database..."
        })
    }
}


exports.getCollegeDataHandler=async(req, res)=>{
    try{
        const {percentile, branch, category}=req.body;
        if(!percentile || !category || !branch){
            return res.status(403).json({
                success: false,
                message: "Please Enter all details..."
            }) 
        }

        const min=percentile-5;
        const result=await CollegeCutoff
        .find({[category]:{$lte:percentile}, Branch:branch})
        .select({_id:0, CollegeName:1, Branch:1, [category]:1})
        .sort({ [category]: -1 });


        // console.log("result: ", result);
        return res.status(200).json({
            success:true,
            data:result,
            message:"Data fetched Successfully..."
        });

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in getting college lists..."
        })
    }
}