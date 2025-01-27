import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    isLoading: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fix: Add a slash between the URL and the user id
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        const user = response.data;

        setUserData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          department: user.department,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, department } = userData;

    if (firstName && lastName && email && department) {
      setUserData({ ...userData, isLoading: true });

      const updatedUser = { firstName, lastName, email, department };

      try {
        // Fix: Correct the URL in the PUT request
        await axios.put(`http://localhost:5000/users/${id}`, updatedUser);
        alert("User updated successfully!");
        navigate("/"); // Navigate to the home page after success
      } catch (error) {
        alert("Error updating user: " + error.message);
      } finally {
        setUserData({ ...userData, isLoading: false });
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  const { firstName, lastName, email, department, isLoading } = userData;

  return (
    <div className="d-flex justify-content-center align-items-center bg-light vh-100">
      <div className=" w-90 w-md-90  border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="Enter First Name"
              value={firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              name="department"
              className="form-control"
              placeholder="Enter Department"
              value={department}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update User"}
          </button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
