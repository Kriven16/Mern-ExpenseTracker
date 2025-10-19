// import React, { useContext, useEffect } from "react";
// import { UserContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPath";

// const useUserAuth = () => {
//   const { user, updateUser, clearUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   console.log("useUserAuth ran, user:", user);


//   useEffect(() => {
//     if (user) return; // already have user

//     let isMounted = true;

//     const fetchUser = async () => {
//       try {
//         const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
//         alert(`Fetched user: ${JSON.stringify(response.data)}`);


//         if (isMounted && response.data) {
//           updateUser(response.data);
//         }
//       } catch (error) {
//         console.log("Failed to fetch user info:", error);
//         if (isMounted) {
//           clearUser();
//           navigate("/login");
//         }
//       }
//     };

//     fetchUser();

//     return () => {
//       isMounted = false;
//     };
//   }, [user, updateUser, clearUser, navigate]);
// };

// export default useUserAuth;

import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (user) return; // already have user

    let isMounted = true;

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        

        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        if (error.response) {
          console.log("❌ Server responded with error:");
          console.log("Status:", error.response.status);
          console.log("Data:", error.response.data);
        } else if (error.request) {
          console.log("❌ No response received. Request:", error.request);
        } else {
          console.log("❌ Error setting up request:", error.message);
        }

        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
};

export default useUserAuth;

