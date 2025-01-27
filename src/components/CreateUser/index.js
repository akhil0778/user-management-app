import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BASE_URL = "http://localhost:5000/users";

// Add user function
export const addUser = async (user) => {
  try {
    const response = await axios.post(BASE_URL, user);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add user: " + error.message);
  }
};

class CreateUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    isLoading: false,
  };

  // Function to generate unique ID
  generateUniqueId = () => {
    const timestamp = Date.now();
    const randomValue = Math.floor(Math.random() * 1000);
    return `${timestamp}-${randomValue}`;
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, department } = this.state;
    const { navigate } = this.props;

    if (firstName && lastName && email && department) {
      this.setState({ isLoading: true });

      const newUser = {
        id: this.generateUniqueId(), // Use the class method to generate ID
        firstName,
        lastName,
        email,
        department,
      };

      try {
        await addUser(newUser);
        alert("User added successfully!");
        navigate("/"); // Navigate back to the Home page after adding the user
      } catch (error) {
        alert(error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    } else {
      alert("Please fill out all fields!");
    }
  };

  render() {
    const { firstName, lastName, email, department, isLoading } = this.state;

    return (
      <div className="d-flex justify-content-center align-items-center bg-light vh-100">
        <div className="w-90 w-md-70 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1>Add a User</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-2">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Enter First Name"
                value={firstName}
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add User"}
            </button>
            <Link to="/" className="btn btn-primary ms-3">
              Back
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

// Functional wrapper to provide the navigate prop
function CreateUserWrapper(props) {
  const navigate = useNavigate();
  return <CreateUser {...props} navigate={navigate} />;
}

export default CreateUserWrapper;
