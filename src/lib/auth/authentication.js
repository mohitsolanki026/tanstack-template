import { useEffect } from "react";
import {
  Navigate,
  redirect,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../axios";
// import {setToken} from "./authorization";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["/api/user"],
    queryFn: () =>
      axios
        .get("/api/user")
        .then((res) => res.data)
        .catch((error) => {
          if (error.response.status !== 409) throw error;

          navigate({ to: `/verify-email`, replace: true });

          throw error
        }),
    retry: 1,
  });

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = useMutation({
    mutationFn: async ({ setErrors, ...props }) => {
      await csrf();
      try {
        await axios.post("api/auth/register", props);
      navigate({to:"/login"})
        return await queryClient.invalidateQueries("api/user");
      } catch (error) {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      }
    },
  });

  const login = useMutation({
    mutationFn: async ({ setErrors, ...props }) => {
      await csrf();
      try {
        const response = await axios.post("api/auth/login", props);
        console.log(response);
        // const {setToken} = useAuthorization()
        // setToken(response.data.token)
        navigate({ to: '/', replace: true });

      } catch (error) {
        // if (error.response.status !== 422) throw error;
        setErrors(error.response.data.message);
      }
    },
    // onError:{
    //   setErrors:()=>{}
    // }
  });

  const logout = useMutation({
    mutationFn: async () => {
      if(!isError){
      const data = await axios.post("api/logout");
        console.log(data,"logout")
    }
    queryClient.removeQueries();
      navigate({ to: "/login", replace: true });
    },
  });
  

  //   const forgotPassword = useMutation(
  //     async ({ setErrors, setStatus, email }) => {
  //       await csrf();
  //       try {
  //         const response = await axios.post("/forgot-password", { email });
  //         return setStatus(response.data.status);
  //       } catch (error) {
  //         if (error.response.status !== 422) throw error;

  //         setErrors(error.response.data.errors);
  //       }
  //     }
  //   );

  //   const resetPassword = useMutation(
  //     async ({ setErrors, setStatus, ...props }) => {
  //       await csrf();
  //       try {
  //         const response = await axios.post("/reset-password", {
  //           // token: params.token,
  //           ...props,
  //         });
  //         return await navigate("/login?reset=" + btoa(response.data.status));
  //       } catch (error) {
  //         if (error.response.status !== 422) throw error;

  //         setErrors(error.response.data.errors);
  //       }
  //     }
  //   );

  //   const resendEmailVerification = useMutation(async ({ setStatus }) => {
  //     const response = await axios.post("/email/verification-notification");
  //     return setStatus(response.data.status);
  //   });

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      navigate({ to: redirectIfAuthenticated, replace: true });
    }
    if (middleware === "auth" && isError) {
      logout.mutate();
    };
  }, [user, isError]);

  return {
    user,
    register,
    login,
    logout,
    // forgotPassword,
    // resetPassword,
    // resendEmailVerification,
  };
};
