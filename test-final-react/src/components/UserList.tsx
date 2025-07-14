import { useUserContext } from "../context/UserProvider";
import { Link } from "react-router-dom";

const UserList = () => {
  const { users } = useUserContext();

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User List</h2>
      {users.map((user) => (
        <div
          key={user.id}
          className="mb-3 last:mb-0 border-b border-gray-200 pb-3 last:border-b-0"
        >
          <Link
            to={`/users/${user.id}`}
            className="block hover:bg-gray-100 rounded transition-colors"
          >
            <p className="text-lg text-gray-700">
              <strong className="font-semibold text-blue-600">
                {user.name}
              </strong>
              {" - "}
              <span className="text-gray-500">{user.email}</span>
              {" - "}
              <span className="text-gray-400">{user.age ?? "N/A"}</span>
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserList;
