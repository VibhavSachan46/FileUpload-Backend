const File = require("../models/File");
const cloudinary = require("cloudinary").v2

//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ", file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success: true,
            message: 'Local File Uploaded Successfully',
        });

    }
    catch (error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    options.resource_type = "auto";
    if (quality) {
        options.quality = quality
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.imageUplaod = async (req, res) => {
    try {
        // data fetch from request
        const { name, tags, email } = req.body;
        console.log(name, tags, email)

        const file = req.files.imageFile;
        console.log(file)

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"]
        const fileType = file.name.split('.')[1].toLowerCase()
        console.log("file type is", fileType)

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            })
        }

        // file format supported hai

        console.log("upllaoding nojfer cloudinary")
        const response = await uploadFileToCloudinary(file, "Vibhav")
        console.log("after uploading", response)

        // db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully uploaded",
        })

    }

    catch (error) {
        console.error(error)
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// Video upload handler

exports.videoUplaod = async (req, res) => {
    try {
        // data fetch from request
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;

        //validation
        const supportedTypes = ["mp4", "mov"]
        const fileType = file.name.split('.')[1].toLowerCase()
        console.log("file type is", fileType)

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'Video File format not supported'
            })
        }

        // file format supported hai

        console.log("upllaoding nojfer cloudinary")
        const response = await uploadFileToCloudinary(file, "Vibhav")
        console.log("after uploading", response)

        // db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully uploaded",
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Video not uplaoded"
        })
    }
}

// imageSize reducer

exports.imageSizeReducer = async (req, res) => {
    try {
        // data fetch from request
        const { name, tags, email } = req.body;
        console.log(name, tags, email)

        const file = req.files.imageFile;
        console.log(file)

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"]
        const fileType = file.name.split('.')[1].toLowerCase()
        console.log("file type is", fileType)

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            })
        }

        // file format supported hai

        console.log("upllaoding nojfer cloudinary")
        const response = await uploadFileToCloudinary(file, "Vibhav", 80);
        console.log("after uploading", response)

        // db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully uploaded",
        })
    }
    catch (error) {
        console.error(error)
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}