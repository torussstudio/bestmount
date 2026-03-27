

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

destination:(req,file,cb)=>{
cb(null,"uploads/");
},

filename:(req,file,cb)=>{

const uniqueName =
Date.now() + path.extname(file.originalname);

cb(null, uniqueName);

}

});

const fileFilter = (req,file,cb)=>{

const allowedTypes = [

"image/png",
"image/jpg",
"image/jpeg",
"image/webp",
"application/pdf"

];

if(allowedTypes.includes(file.mimetype)){

cb(null,true);

}else{

cb(new Error("Only image or pdf allowed"),false);

}

};

const upload = multer({

storage,
fileFilter

});

module.exports = upload;