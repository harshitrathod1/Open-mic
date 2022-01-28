import axios from "axios";

import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "redux/userAuth/userAuth.actions";

export function useLoadingWithRefresh(){
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh`,{
                    withCredentials : true,
                });

                dispatch(setAuth(data));
                setLoading(false);
            } catch (error) {
                console.log("UseLoadingRefreshError : ",error);
                setLoading(false);
            }
        })();
    }, []);

    return { loading };
}