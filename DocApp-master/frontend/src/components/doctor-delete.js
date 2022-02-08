import React,{useState} from "react";
import Modal from 'react-bootstrap/Modal'
import DoctorHome from "./doctor-home";

const DeleteDoctor = ()=>{
    const [show,setShow] = useState(true)
    const hide = ()=>{
        setShow(false)
    }
    return(

    <Modal backdrop={true} show={show} onHide={hide}>
    <Modal.Header closeButton>
    <Modal.Title>Delete Account</Modal.Title>
    </Modal.Header>

    <Modal.Body>
    <p> Are your sure you want to delete your profile?</p>
  </Modal.Body>

  <Modal.Footer>
    <button className="primary" onClick={hide} >Close</button>
    <button className="danger">Delete</button>
  </Modal.Footer>
  </Modal>
    )
}

export default DeleteDoctor