import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import useNomineecontext from '../hooks/useNomineecontext';
const Home = () => {
    const userID = JSON.parse(localStorage.getItem('YaleID'))
    const email = JSON.parse(localStorage.getItem('Yalemail'))
    const [candidates, setCandidates] = useState()
    const [nominees, setNominees] = useState({ userID: userID, email: email })
    const [disable, setDisable] = useState(true)
    const { dispatch } = useNomineecontext()

    useEffect(() => {

        const fetchdata = async () => {
            // const response = await fetch('http://localhost:8000/api/getcandidate')
            const response = await fetch('https://yalebackend.onrender.com/api/getcandidate')

            const json = await response.json()
            if (response.ok) {
                setCandidates(json)
                // alert('Nomination can only be done once')
            }
        }
        fetchdata()
    }, [])

    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch('http://localhost:8000/api/validnomination/', {
                method: 'POST',
                body: JSON.stringify({ userID }),
                headers: { 'Content-Type': 'application/json' }
            })

            const json = await response.json()
            if (response.ok) {
                setDisable(json.disable)
                // alert('you have nominated already')
            }
        }
        fetchdata()
        // eslint-disable-next-line 
    }, [])

    
    const handleNominee = (event, position) => {
        const nominee = event.target.value
        const updatedNominees = (include) => ({ ...include, [position]: nominee })
        setNominees(updatedNominees)
    }

    const handleSubmit = async () => {
        const response = await fetch('https://yalebackend.onrender.com/api/nominees', {
            method: 'POST',
            body: JSON.stringify(nominees),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()

        if (response.ok) {
            setDisable(json.disable)
            alert('nomination successful')
            dispatch({ type: 'nominated', payload: nominees })
        }

    }
    return (
        <div className="p-3">
            {candidates && candidates.map((item) => (
                <div className="" key={item._id}>
                    <p className="lead">{item.Position}</p>
                    <select className='d-block w-25 drop-down mb-3' onChange={(e) => handleNominee(e, item.Position)}>
                        <option value="" >Nominate condidate</option>
                        <option value={item.Candidate1}>{item.Candidate1}</option>
                        <option value={item.Candidate2}>{item.Candidate2}</option>
                        <option value={item.Candidate3}>{item.Candidate3}</option>
                        <option value={item.Candidate4}>{item.Candidate4}</option>
                        <option value={item.Candidate5}>{item.Candidate5}</option>
                    </select>
                </div>
            ))
            }

            {disable && <Button onClick={handleSubmit} className='btn-small'>Nominate</Button>}
        </div >
    );
}

export default Home;