import axios from "axios";

export const getAPIDetails = async (url, request) => {
    try {
        if(request.TYPE==="GET") {
            const response = await axios.get(url);
            return response;
        }
        else if(request.TYPE==="POST") {
            const response = await axios.get(url, request);
            return response;
        }
        else {
            return {
                statusCode: 404,
                message: `${request.type} requestType Not Found.`
            }
        }
    }
    catch(err) {
        return err;
    }
    // return response;
}