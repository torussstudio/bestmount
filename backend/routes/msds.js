const express = require("express");
const router = express.Router();
const upload = require("../multer");
const path = require("path");
const fs = require("fs");


// upload pdf
router.post(
"/upload",
upload.single("msds"),
(req,res)=>{

try{

if(!req.file){
return res.status(400).json({
message:"No pdf uploaded"

})
}

res.json({

message:"MSDS uploaded successfully",

file:req.file.filename

})

}catch(err){

console.log(err)

res.status(500).json({

message:"upload error"

})


}

})

module.exports = router;