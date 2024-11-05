import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const Create = () => {
  const [sendData, setSendData] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const passData = async (data) => {
    setSendData(true);
    try {
      await axios.post("http://localhost:8000/user", data);
      alert("User Created Successfully");
    } catch (error) {
      console.log(error.message);
    } finally {
      setSendData(false);
      reset();
      navigate("/");
    }
  };

  const ViewData =()=>{
    navigate('/')
  }
  return (
    <div className="container-md">
      <div className="create-users">
        <h2>Create User Data</h2>
        <form action="" onSubmit={handleSubmit(passData)}>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the Id"
            {...register("id")}
          />
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="Enter the name"
            {...register("name")}
            required
          />
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            placeholder="Enter the Email id"
            {...register("email")}
            required
          />
          <label className="form-label" htmlFor="age">
            Age
          </label>
          <input
            className="form-control"
            type="number"
            name="age"
            id="age"
            placeholder="Enter the age"
            {...register("age")}
            required
          />
          <label className="form-label" htmlFor="city">
            City
          </label>
          <input
            className="form-control"
            type="text"
            name="city"
            id="city"
            placeholder="Enter the city"
            {...register("city")}
            required
          />
         <div className="create-buttons">
         <button className="btn btn-primary me-4  " disabled={sendData}>
            {sendData ? "Submiting....." : "Submit Data"}
          </button>
          <button
            onClick={() => {
              reset();
            }}
            className="btn btn-dark me-4 btn-outline-light "
          >
            Clear Data
          </button>
         
           
            <button className="btn btn-success  view " onClick={()=>{ViewData()}}>View List</button>
         
         </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
