import { Link } from "react-router-dom";
import axios from "axios";

const UserList = ({ userData, serialNo, refreshUsers }) => {
  const { firstName, lastName, email, department, id } = userData;

  const onDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        alert("User deleted successfully!");
        if (refreshUsers) {
          refreshUsers();
        }
      } catch (error) {
        alert("Failed to delete user. Please try again later.");
      }
    }
  };

  return (
    <tr className="align-middle">
      <th scope="row" className="text-center fs-6 fs-md-5 text-nowrap">
        {serialNo}
      </th>
      <td className="text-capitalize fs-6 fs-md-5 text-nowrap">{firstName}</td>
      <td className="text-capitalize fs-6 fs-md-5 text-nowrap">{lastName}</td>
      <td className="text-break fs-6 fs-md-5 text-nowrap">{email}</td>
      <td className="text-capitalize fs-6 fs-md-5 text-nowrap">{department}</td>
      <td className="text-center">
        <div className="d-flex justify-content-center">
          <Link to={`/users/${id}`} className="btn btn-sm btn-primary me-2 fs-6">
            Edit
          </Link>
          <button className="btn btn-sm btn-danger fs-6" onClick={() => onDeleteUser(id)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserList;
