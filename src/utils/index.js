import axios from "axios";

// hàm upload image
export const uploadFile = (file) => {
    // KEY NAME CLOU
    const CLOUDINARY_NAME = "dmtxuvqdc";
    const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;
    const CLOUDINARY_PRESET = "ecma-fall23"; // KEY NAME PRESET creta
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const res = axios.post(CLOUDINARY_API, formData, {
        headers: {
            "Content-Type": "application/form-data",
        },
    });

    return res;
};