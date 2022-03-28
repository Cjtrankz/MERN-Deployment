import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const ShowOne = (props) => {

    const { id } = useParams();
    const [pet, setPet] = useState({});
    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => {
                setPet(res.data.pet)
                console.log("pet: " + res.data.pet)
            })
            .catch(err => console.log(err))
    }, [])

    const deletePet = (deleteId) => {
        axios.delete(`http://localhost:8000/api/pets/delete/${deleteId}`)
        .then(res => {
          console.log(res.data)
        })
        .catch(err => console.log(err))
        history.push('/')
    }

    return (
        <div style={{margin:30}}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <h1>Pet Shelter</h1>
                <Link to={'/'}>Back to home</Link>
            </div>
            <div style={{display:'flex',  justifyContent:'space-evenly', alignItems:'center'}}>
                
            <h1>Details about: {pet.name}</h1>
            <button style={{height:30, backgroundColor:'red', color:'white'}} onClick={() => {deletePet(pet._id)}}>Adopt {pet.name}</button>
            </div>
            <div style={{ border:'2px solid black', display:'flex', textAlign:'left' }}>
                <ul style={{listStyle:'none'}}>
                    <li>Pet type: {pet.type}</li>
                    <li>Description: {pet.description}</li>
                    <li>Skills:
                        <ul style={{listStyle:'none'}}>
                            <li>{pet.skill1}</li>
                            <li>{pet.skill2}</li>
                            <li>{pet.skill3}</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ShowOne