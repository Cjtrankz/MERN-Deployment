import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Create = (props) => {

    const history = useHistory();

    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [petDesc, setPetDesc] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");

    const [errors, setErrors] = useState([]);

    const addPet = (e) => {
        e.preventDefault();
        const petData = {
            name: petName, type: petType, description: petDesc, skill1, skill2, skill3
        }
        // console.log(petData)
        axios.post('http://localhost:8000/api/pets/new', petData)
            .then(res => {
                console.log(res.data)
                history.push('/')
            })
            .catch(err => {
                console.log(err.response.data)
                const errorResponse = err.response.data.errors;
                console.log(errorResponse)
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }


    return (
        <div style={{margin:30}}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <h1>Pet Shelter</h1>
                <Link to={'/'}>Back to home</Link>
            </div>
            <h1>Know a pet needing a home?</h1>
            <div style={{border:'2px solid black', margin:10}}>
                <form onSubmit={addPet}>
                    {/* {JSON.stringify(errors)} */}
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
                    Skills (optional):
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

                    <input type="submit" value="Add Pet" />
                </form>
            </div>
        </div>
    )
}

export default Create