import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewDetails = () => {
const{id}=  useParams()
console.log(id)
const [value,setValue]=useState([])

useEffect(()=>{
fetcher()

},[id])


const fetcher= async()=>{
    
 const res= await axios.get(`http://localhost:8000/user/${id}`)
 console.log(res.data)
 
 setValue(res.data)

}
  return <div className="container">
     <div className="view_details">
      <h2>View User Details</h2>
      <p><strong>ID: </strong>{value.id}</p>
      <p><strong>Name: </strong> {value.name}</p>
      <p><strong>Age: </strong>{value.age}</p>
      <p><strong>Email: </strong>{value.email}</p>
      <p><strong>City: </strong>{value.city}</p>
      <Link to={"/"} className="btn btn-primary btn1">Back</Link>
     </div>
  </div>;
};

export default ViewDetails;
