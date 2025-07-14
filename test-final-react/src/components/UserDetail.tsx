import { useParams } from "react-router-dom";
import { useUserContext } from "../context/UserProvider";

const UserDetail = () => {
  const { users } = useUserContext();
  const { id } = useParams<{ id: string }>();

  const user = users.find((u) => u.id === Number(id));

  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Detail for {user.name}
      </h2>
      <p className="mb-2 text-gray-700">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Age:</span> {user.age ?? "N/A"}
      </p>
    </div>
  );
};

export default UserDetail;
