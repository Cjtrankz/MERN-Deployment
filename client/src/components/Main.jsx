import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Main = (props) => {

    const [allPets, setAllPets] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/pets')
            .then(res => {
                console.log(res.data.pets)
                setAllPets(res.data.pets)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div style={{ margin: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <h1>Pet Shelter</h1>
                <Link to={'/pets/create'}>Add a new pet</Link>
            </div>
            <div>
                <h3>These pets are looking for a good home</h3>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                        {/* map data here */}
                        {allPets.map((pet, i) => {
                            return <tr key={i}>
                                <td>{pet.name}</td>
                                <td>{pet.type}</td>
                                <td><Link to={`/pets/${pet._id}`}>Details</Link> | <Link to={`/pets/${pet._id}/edit`}>Edit</Link></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Main