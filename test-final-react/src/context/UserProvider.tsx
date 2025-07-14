import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/type";

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, "id">) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: Omit<User, "id">) => {
    setUsers((prev) => [...prev, { id: Date.now(), ...user }]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("UserContext must be used inside UserProvider");
  return context;
};
