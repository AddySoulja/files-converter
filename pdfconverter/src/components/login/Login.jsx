import React, { useEffect, useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../../redux/slices/usersApiSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Loader from "../../common/loader/Loader";
import { useCookies } from "react-cookie";
import { loginFormat } from "../../utils/templates";
import { setCredentials } from "../../redux/slices/authSlice";

const Login = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [form, setForm] = useState(loginFormat);
  const [isLoading, setIsLoading] = useState(false);
  const [_, setCookie] = useCookies(["jwt"]);
  //   const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    const formData = new FormData();
    if (!email || !password) {
      return toast.error("Please provide a valid email or password!");
    }
    formData.append("email", email);
    formData.append("password", password);
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/users/auth", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const user = data.user;
      setCookie("jwt", user.token);
      dispatch(setCredentials(user));
      navigate("/");
      setForm(loginFormat);
    } catch (e) {
      toast.error(e?.data?.message || e.message);
    }
    setIsLoading(false);
  };
  const handleInputChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Container
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "100px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              width: "300px",
              height: "300px",
              gap: "14px",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="filled"
              name="email"
              value={form.email}
              onChange={handleInputChange}
            />
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="filled"
              name="password"
              value={form.password}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              variant="filled"
              sx={{
                background: "#222",
                color: "#FFF",
                ":hover": {
                  color: "#000",
                  border: "1px solid #000",
                },
              }}
            >
              Login
            </Button>
            <br />
            <span>Don&#39;t have an account? </span>
            <Link to="/signup">Create account</Link>
          </form>
        </Container>
      )}
    </>
  );
};

export default Login;
