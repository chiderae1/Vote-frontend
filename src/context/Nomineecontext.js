import { createContext, useReducer } from "react";

export const Nomineecontext = createContext()

export const nomineeReducer = (state,action) =>
{
    switch(action.type){
        case 'USERDETAILS':
            return {user : action.payload}
        default:
            return state
    }
}

const NomineecontextProvider = ({children}) => {
    const [state,dispatch] = useReducer(nomineeReducer, {user: null} )
    return (
        <Nomineecontext.Provider value = {{...state,dispatch}}>
            {children}
        </Nomineecontext.Provider>
      );
}
 
export default NomineecontextProvider;