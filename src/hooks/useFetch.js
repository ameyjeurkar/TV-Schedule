import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getSchedule } from "../redux/slice/tvScheduleSlice";

export const useFetch = (url) => {
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAPIResponse();
    }, [url])
    
    const fetchAPIResponse = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(url);
            setResponse(res)
            dispatch(getSchedule(res))
            setIsLoading(false);
        }
        catch(err) {
            setError(err);
            setIsLoading(false);
        }
    }

    return { isLoading, response, error };
}