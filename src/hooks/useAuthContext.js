import { useContext } from "react";

import { Authcontext } from "../context/AuthContext";


const useAuthcontext = () => {
    const context = useContext(Authcontext)
    if(!context){
        throw Error('useAuthcontext must be used inside Authcontext')
    }
    return context;
}
 
export default useAuthcontext;