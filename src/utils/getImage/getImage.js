import axios from "axios"


const getIMage = async (image) => {
    var stamp = Date.now();
    var ext = ".png";
    var newFileName = stamp + ext;
    try {
        const URL = process.env.REACT_APP_S3_BUCKET + newFileName
        await axios.put(URL, image)
        return URL
    } catch (error) {
        console.log("🚀 ~ file: getImage.js ~ line 8 ~ getIMage ~ error", error)

    }
}

export default getIMage