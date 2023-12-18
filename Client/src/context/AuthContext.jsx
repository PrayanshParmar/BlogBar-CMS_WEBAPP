import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const setAuth = async () => {
    try {
      const res = await fetch("/verifyuser", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
  
      if (res.status === 200) {
        // console.log("set",data);
        setUser(data);
      } else if (res.status === 401) {
        setUser(null);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setAuth();
  }, []);
  

  const getAuth =  () => { 
        // console.log("user",user);
        return  user;
    
  };

  const deleteUser = async () => {
    setUser(null);
    try {
      await fetch("/logout", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ setAuth, getAuth, deleteUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
