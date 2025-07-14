import { useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserProvider';

const UserDetail = () => {
  const { users } = useUserContext();
  const { id } = useParams<{ id: string }>();

  const user = users.find((u) => u.id === Number(id));

  if (!user) return <p>User not found</p>;

  return (
    <div>
      <h2>Detail for {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Age: {user.age ?? 'N/A'}</p>
    </div>
  );
};

export default UserDetail;
