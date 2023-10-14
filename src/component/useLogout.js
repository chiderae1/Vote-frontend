import { useNavigate } from 'react-router-dom';
const useLogout = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('YaleID')
        localStorage.removeItem('Yalemail')
        localStorage.removeItem('Yalepasss')
        navigate('/login')
    }
    return logout;
}
 
export default useLogout;