import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../style/style.css'

const Forms = () => {

    const navigate = useNavigate()
    const url = 'https://fedeperin-harry-potter-api.herokuapp.com/personajes/'

    const [values,setValues] = useState({
          id:'', 
          personaje:'',
          casaDeHogwarts: '',
          imagen: ''
      })
    const { id, personaje, casaDeHogwarts, imagen } = values 

    const handleInputChange = ( { target } ) => {
      setValues({
            ...values,
            [ target.name ]: target.value 
      })       
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const postItem = () => {
        axios.post(url, values)
        .then(response =>{
            console.log(response.data);
        }).catch(error=> {
            console.log(error);
        })

        setTimeout(() => {
            alert(`se ha agregado a ${personaje} a la api`)
            navigate('/list')
        }, 1000);
    }

    return (
        <div id='formDiv'>
            <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3" >
                    <Form.Label><h5>id</h5></Form.Label>
                    <Form.Control type="text" placeholder="Enter ID" name='id' value={id} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label><h5>Nombre</h5></Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name='personaje' value={personaje} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label><h5>equipo</h5></Form.Label>
                    <Form.Control type="text" placeholder="enter specie" name='casaDeHogwarts' value={casaDeHogwarts} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label><h5>url imagen</h5></Form.Label>
                    <Form.Control type="text" placeholder="Enter gender" name='imagen' value={imagen} onChange={handleInputChange} />
                </Form.Group>
                <Button variant="success" type="submit" onClick={postItem} >
                 Save
                </Button>
            </Form>
        </div>
    )
}

export default Forms