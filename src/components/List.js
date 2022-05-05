import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, FormControl, Row, Spinner } from 'react-bootstrap'
import '../style/style.css'

const List = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState([])
  const [cards, setCards] = useState([])
  const api = 'https://fedeperin-harry-potter-api.herokuapp.com/personajes/'

  //peticion con async await
  const getData = async () => {
    setLoading(true)
    const req = await fetch(api)
    const resp = await req.json()
    setData(resp)
    setCards(resp)
    setLoading(false)
  }

  //peticion con axios
  // const getData = async () => {
  //   setLoading(true)
  //   await axios.get(api)
  //     .then(resp => {  
  //       setData(resp.data)
  //       setLoading(false)
  //     }).catch(error => {
  //       console.log(error);
  //     })
  // }

  useEffect(() => {
    getData()
  }, [])

  const deletePers = (id) => {
    axios.delete(api + id)
      .then(() => {
        getData()
      }).catch(error => {
        console.log(error)
      })
  }
  
  const handleChange = (e) => {
    setSearch( e.target.value )
    filtered( e.target.value );
  }

  const filtered = ( searchValue ) => {
    let searchResult = cards.filter((e) => {
      if (e.personaje.toString().toLowerCase().includes( searchValue.toLowerCase() )) {
        return e
      }
    })
    setData( searchResult )
  }

  const Loading = () => {
    return <Spinner animation="border" role="status" variant="success" style={{ margin: '25% 50%' }} >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  }

  return (
    loading ? <Loading /> :

      <div id='mainDiv'>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={handleChange}
          />
          <Button variant="outline-info">Search</Button>
        </Form>
        <Row xs={1} md={4} className="g-4">
          {data.map((e, i) => (
            
              <Col key={i} >
                <div id='cardCont' >
              <Card.Img variant="top" src={e.imagen} />
              <Card.Body >
                <h5>{e.id}</h5>
                <Card.Title>{e.personaje}</Card.Title>
                <h4>{e.casaDeHogwarts}</h4>
                <Button className='btn-danger' onClick={() => deletePers(e.id)} > Eliminar </Button>
              </Card.Body>
              </div>
            </Col>
        
          ))}
        </Row>
      </div>
  )
}

export default List