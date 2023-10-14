import { useContext } from "react";
import { Nomineecontext } from "../context/Nomineecontext";


const useNomineecontext = () => {
    const context = useContext(Nomineecontext)
    if(!context){
        throw Error('useNomineecontext must be used inside Nomineecontext')
    }
    return context;
}
 
export default useNomineecontext;