import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if(savedUser){
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);

  }, []);



  const login = (userData, token) => {

    localStorage.setItem(
      "token",
      token
    );


    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );


    setUser(userData);

  };



  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

  };



  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,

        // useful later
        isWorker: user?.role === "Worker",
        isManager: user?.role === "Manager",
      }}
    >

      {children}

    </AuthContext.Provider>
  );

};


export const useAuth = () => 
  useContext(AuthContext);