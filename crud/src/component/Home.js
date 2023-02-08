import React,{useState,useEffect} from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function Home() {
  const [singleFile, setSingleFile] = useState([]);
  const [change, setChange] = useState({ _id: '', cat: '', filePath: '', title:''});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(change,"90")
  const getSingleFiles = async () => {
    try {
      const pic = await axios.get("http://localhost:8000/api/getallSingleFiles")
      console.log(pic.data, 'singlefile')
      setSingleFile(pic.data)
    } catch (err) {
      console.log(err)
    }

  }
  useEffect(() => {
    getSingleFiles()
   

  }, [singleFile])
  useEffect(() => {
   
    handleDelete()

  }, [singleFile])
  const handleChange=async(id)=>{
try{
  console.log(id)
  const pic = await axios.put(`http://localhost:8000/api/${id}`)
  .then(res=>{
    const some = singleFile.find(item=>{
      return item._id === res.data._id
    })
    setChange(some)
  })
 

}catch(err){
  console.log(err)
}
  }
  const handleDelete=async(id)=>{
  try{
    await axios.delete(`http://localhost:8000/api/${id}`)
    .then(res=>{
      const newList = singleFile.filter(item => {

        console.log(res);

        return item._id !== res.data._id

      })
      setSingleFile(newList)
    })

  }catch(err){
    console.log(err)
  }
  }
  return (
    <div className='appp'>
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
                
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Category</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={() => setChange(change.cat)} />
              </Form.Group>
              <input type="file" className='form-control'  onChange={() => setChange(change.filePath)}  />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" >
              Close
            </Button>
            <button onClick={() => handleChange(change._id)}>Edit</button>
          </Modal.Footer>
        </Modal>

      </div>
    <div className='gallery'>
      {
        singleFile.map(item=>
          <div className='box'>
          
          
          <img  src={`http://localhost:8000/${item.filePath}`}  
          alt="error" />
          <div className='parent'>
          <div className='title'>    
          <h4>{item.title}</h4></div>
          <div className='cat'>
          <p>{item.cat}</p></div>
          {/* <div className='btn1'>
                <button onClick={handleShow}>Edit</button>
          </div> */}
          <div className='btn2'>
                <button className='btnn' onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
         </div>
    </div>
        )
      }
    </div>
    </div>
  )
}

export default Home