import { createContext, useEffect, useReducer } from "react";

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
    const [state,dispatch] = useReducer(authReducer, {Auth: null} )
    useEffect(() => {
        const Yaleid = JSON.parse(localStorage.getItem('YaleID'))
        if(Yaleid){
            dispatch({type : 'LOGIN', payload : Yaleid})
        }
    })
    return (
        <Authcontext.Provider value = {{...state,dispatch}}>
            {children}
        </Authcontext.Provider>
      );
}
 
export default AuthcontextProvider;