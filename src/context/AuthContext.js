import { createContext, useReducer } from "react";

export const Authcontext = createContext()

export const authReducer = (state,action) =>
{
    switch(action.type)
    {
        case 'LOGIN':
            return {user : action.payload}
        default:
            return state
    }
}

const AuthcontextProvider = ({children}) => {
    const [state,dispatch] = useReducer(authReducer, {Auth: 'chidera'} )
    return (
        <Authcontext.Provider value = {{...state,dispatch}}>
            {children}
        </Authcontext.Provider>
      );
}
 
export default AuthcontextProvider;