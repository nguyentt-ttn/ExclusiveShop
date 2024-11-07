import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const UserList = () => {
  const { state } = useContext(UserContext);
  return (
    <div className="mt-2">
      <table className="table table-bordered table-striped container">
        <thead className="table-dark ">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {state.users.map((acc) => (
            <tr>
              <td className="fst-italic">{acc.id}</td>
              <td className="fst-italic">{acc.name}</td>
              <td className="fst-italic">{acc.email}</td>
              <td className="fst-italic">{acc.address}</td>
              <td className="fst-italic">{acc.role}</td>
            </tr>
          ))}{" "}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
