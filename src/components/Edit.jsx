import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const Create = () => {
  const [sendData, setSendData] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  useEffect(() => {
    defaultValue();
  }, []);
  const defaultValue = async () => {
    const res = await axios.get(`http://localhost:8000/user/${id}`);
   
    setValue("id", res.data.id);
    setValue("name", res.data.name);
    setValue("age", res.data.age);
    setValue("email", res.data.email);
    setValue("city", res.data.city);
  };

  const passData = async (data) => {
   
    setSendData(true);
    try {
      await axios.put("http://localhost:8000/user/" + id, data);
      alert("Data Edited Successfully");
    } catch (error) {
      console.log(error.message);
    } finally {
      setSendData(false);

      navigate("/");
    }
  };
  return (
    <div className="container">
      <div className="create-users">
        <h2>Edit User Data</h2>
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
         <button className="btn btn-primary me-4" disabled={sendData}>
            {sendData ? "Updating....." : "Update Data"}
          </button>
          <button
            onClick={() => {
              reset();
            }}
            className="btn btn-dark me-4 btn-outline-light"
          >
            Clear Data
          </button>
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            <button className="btn btn-danger back ">Back</button>
          </Link>
         </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
