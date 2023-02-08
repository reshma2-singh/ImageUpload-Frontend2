import Container from 'react-bootstrap/Container';
import React, { useState,useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
function Header() {
  const[content,setContent]=useState({})
  const [singleFile, setSingleFile] = useState([]);
  const[single,setSingle]=useState('')
  const[title,setTitle]=useState('')
  const[category,setCategory]=useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const singlefilechange=(e)=>{
    setSingle(e.target.files[0])
  }
  const handleClick=async()=>{
    
    const formData = new FormData()
    formData.append('file', single)
    formData.append('title', title)
    formData.append('cat', category)
    await axios.post(`http://localhost:8000/api/singleFile`, formData ) 
    .then(res=>{
      console.log(res)
      console.log(res.data)
      // getSingleFiles()
    })

  }
 
    return (
        <div>
            <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Post title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                autoFocus
                    onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Category</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>
                <input type="file" className='form-control' onChange={(e) => singlefilechange(e)} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
              <button type='button'  className='btn btn-primary' onClick={handleClick}>Create Post</button>
        </Modal.Footer>
      </Modal>
 
            </div>
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Gallery</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing" onClick={handleShow}>Create Post</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            </div>
        </div>
    );
}

export default Header;