import { Component } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader"; // Import loader
import UserList from "../UserList";
import { Link } from "react-router-dom";

class Home extends Component {
  state = { isLoading: true, usersData: [] };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const data = await response.data;
      this.setState({ usersData: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      this.setState({ isLoading: false });
    }
  };

  refreshUsers = () => {
    this.fetchUsers(); // Refresh users when a user is added or deleted
  };

  render() {
    const { isLoading, usersData } = this.state;

    return (
      <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
        <div className="mb-3 d-flex justify-content-between">
          <h1 className="mb-4 me-4">Users List</h1>
          <div className="ms-3">
            <Link to="/adduser">
              <button className="btn btn-success">Add User +</button>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="d-flex justify-content-center">
            <ClipLoader color="#00BFFF" loading={isLoading} size={50} />
          </div>
        ) : (
          <>
            {usersData.length > 0 ? (
              <div className="w-100 rounded bg-white border shadow p-4">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-striped text-center">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col" className="fs-6 fs-md-4 text-nowrap">Sr. No.</th>
                        <th scope="col" className="fs-6 fs-md-4 text-nowrap">First Name</th>
                        <th scope="col" className="fs-6 fs-md-4 text-nowrap">Last Name</th>
                        <th scope="col" className="fs-6 fs-md-4 text-nowrap">Email</th>
                        <th scope="col" className="fs-6 fs-md-4 text-nowrap">Department</th>
                        <th scope="col" className="fs-6 fs-md-4 text-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersData.map((user, index) => (
                        <UserList
                          key={user.id}
                          userData={user}
                          serialNo={index + 1}
                          refreshUsers={this.refreshUsers}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p>No users found.</p>
            )}
          </>
        )}
      </div>
    );
  }
}

export default Home;
