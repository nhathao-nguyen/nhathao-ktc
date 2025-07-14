import { useUserContext } from "../context/UserProvider";
import { Link } from "react-router-dom";

const UserList = () => {
  const { users } = useUserContext();

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            <p>
              <strong>{user.name}</strong> - {user.email} - {user.age ?? "N/A"}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserList;
