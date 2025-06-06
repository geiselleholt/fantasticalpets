import AuthProvider from "./authContext";
import UserProvider from "./userContext";

// Parent functional component to house all contexts
export default function AppProvider({ children }) {
  return (
    <UserProvider>
      <AuthProvider>{children} </AuthProvider>
    </UserProvider>
  );
}
