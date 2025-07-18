import { createContext, useContext, useState } from "react";
import axios from "axios";
import httpStatus from "http-status";
import server from '../environment.js'
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext({});

const client = axios.create({
  baseURL: `${server}/api/v1/user`,
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(authContext);
  const router = useNavigate();

  const handleRegister = async (fullname, username, password) => {
    try {
      let request = await client.post("/register", {
        fullname: fullname,
        username: username,
        password: password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username: username,
        password: password,
      });

      console.log(username, password);
      console.log(request.data);

      if (request.status === httpStatus.OK) {
        localStorage.setItem("token", request.data.token);
        router("/home");
      }
    } catch (err) {
      throw err;
    }
  };

  const getHistoryOfUser=async()=>{
    try{
      let request=await client.get("/get_all_activity",{
        params:{
          token:localStorage.getItem("token")
        }
      });
      return request.data;
    }catch(error){
      throw error;
    }
  }

  const addToUserHistory=async(meetingCode)=>{
    try {
      let request=await client.post("/add_to_activity",{
        token:localStorage.getItem("token"),
        meeting_code:meetingCode
      });
      return request;
    } catch (error) {
      throw error
    }
  }


  const data = {
    userData,
    setUserData,
    addToUserHistory,
    getHistoryOfUser,
    handleRegister,
    handleLogin,
  };

  return (
  <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
);
};
