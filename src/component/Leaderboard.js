import { useEffect, useState } from "react";

const Leaderboard = () => {
    const [leadboard, setLeadboard] = useState([{ Coordinator: { bola: 1, ade: 1 } },
    {
        'Deputy coordinator & Director and patnership': { chimdi: 1, bisola: 1 }
    },
    { Secretary: { folarin: 1 } },
    { 'Assistant Secretary': { luke: 2 } },
    { 'Programmes Officer': { adana: 1, vinicus: 1 } },
    { 'Financial Secretary': { goodness: 1 } },
    { Treasurer: { joshua: 1, chris: 1 } },
    { 'Communications and Social Media Manager': { bisola: 1 } }])
    const [a] = useState([2, 3, 4])

    useEffect(() => {
        const fetchnominee = async () => {
            const response = await fetch('http://localhost:8000/api/leaderboard')
            const json = await response.json()

            if (response.ok) {
                setLeadboard(json)
            }
        }

        fetchnominee()
    }, [])


    useEffect(() => {
        // if(
        for (const key in leadboard) {
            console.log(key)
            const value = leadboard[key]
            console.log(value)
        }
    }, [leadboard])


    return (
        <div className="mb-5">
            <p>working fine</p>
            {leadboard && leadboard.map((item, index) =>
                <div className="mb-5">
                    <p className="text-center lead p-3">{Object.keys(item)[0]}</p>
                    <table className="tableStyle" key={index}>
                        <tr className="thStyle">
                            <th>#</th>
                            <th className="ms-5">Candidates</th>
                            <th className="">Nominees</th>
                        </tr>
                        {Object.entries(item[Object.keys(item)[0]]).map(([personName, value], index) =>
                            <tr className="">
                                <td className="tdStyle">{index + 1}</td>
                                <td className="tdStyle">{personName}</td>
                                <td className="tdStyle">{value}</td>
                            </tr>
                        )}
                    </table>
                </div>
            )}
        </div>
    );
}

export default Leaderboard;