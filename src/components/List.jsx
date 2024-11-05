import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    GetApi();
  }, []);

  const GetApi = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user");
      console.log(res);
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      console.error("Error fetching users: ", error);
      setError("Failed to load users.");
    }
  };

  const Displaydata = (id) => {
    navigate(`/view/${id}`);
  };

  const EditData = (id) => {
    navigate(`/edit/${id}`);
  };

  const DeleteData = async (id) => {
    try {
      if (window.confirm("Do you want to delete this data?")) {
        await axios.delete("http://localhost:8000/user/" + id);
        window.location.reload();
      }
    } finally {
      alert("Data deleted successfully");
    }
  };

  const handleSearchClick = () => {
    if (searchQuery === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(user.age).includes(searchQuery)
        );
      });
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="container-lg  list">
      <div className="list-head-content">
        <h1>Crud Application</h1>
        <div className="search-content">
          <input
            type="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search form-control"
            placeholder="Search by name, email, city, or age"
          />
          <button className="btn btn-success" onClick={handleSearchClick}>
            Search
          </button>
        </div>
        <Link to={"/create"}>
          <button className="btn btn-dark mb-3">Add new User</button>
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}{" "}
      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr className="table-dark">
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td className="list-bns">
                  <button
                    className="btn btn-info me-4"
                    onClick={() => {
                      Displaydata(user.id);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning me-4"
                    onClick={() => {
                      EditData(user.id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger me-4"
                    onClick={() => {
                      DeleteData(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default List;
