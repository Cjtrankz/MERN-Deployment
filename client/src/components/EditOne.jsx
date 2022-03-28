import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link, useParams } from 'react-router-dom'

const EditOne = (props) => {

    const { id } = useParams();
    const history = useHistory();

    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [petDesc, setPetDesc] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => {
                setPetName(res.data.pet.name)
                setPetType(res.data.pet.type)
                setPetDesc(res.data.pet.description)
                setSkill1(res.data.pet.skill1)
                setSkill2(res.data.pet.skill2)
                setSkill3(res.data.pet.skill3)
            })
            .catch(err => console.log(err))
    }, [])

    const editPet = (e) => {
        e.preventDefault();
        const petData = {
            name: petName, type: petType, description: petDesc, skill1, skill2, skill3
        }
        console.log(petData)
        axios.put(`http://localhost:8000/api/pets/${id}/edit`, petData)
            .then(res => {
                console.log(res.data)
                history.push('/')
            })
            .catch(err => {
                console.log(err)
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    return (
        <div style={{ margin: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <h1>Pet Shelter</h1>
                <Link to={'/'}>Back to home</Link>
            </div>
            <h1>Know a pet needing a home?</h1>
            <div style={{ border: '2px solid black', margin: 10 }}>
                <form onSubmit={editPet}>
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
                    <div>
                        <label>Pet Name: </label>
                        <input type="text" onChange={(e) => { setPetName(e.target.value) }} value={petName} />
                    </div>
                    <div>
                        <label>Pet Type: </label>
                        <input type="text" onChange={(e) => { setPetType(e.target.value) }} value={petType} />
                    </div>
                    <div>
                        <label>Pet Description: </label>
                        <input type="text" onChange={(e) => { setPetDesc(e.target.value) }} value={petDesc} />
                    </div>
                    <div>
                        <label>Skill 1: </label>
                        <input type="text" onChange={(e) => { setSkill1(e.target.value) }} value={skill1} />
                    </div>
                    <div>
                        <label>Skill 2: </label>
                        <input type="text" onChange={(e) => { setSkill2(e.target.value) }} value={skill2} />
                    </div>
                    <div>
                        <label>Skill 3: </label>
                        <input type="text" onChange={(e) => { setSkill3(e.target.value) }} value={skill3} />
                    </div>

                    <input type="submit" value="Edit Pet" />
                </form>
            </div>
        </div>
    )
}

export default EditOne