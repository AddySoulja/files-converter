import React, { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
// import Loader from "../../common/loader/Loader";
import { registerFormat } from "../../utils/templates";
import { setCredentials } from "../../redux/slices/authSlice";
import { convertByteArrayToBase64 } from "../../utils/binaryToBase64";

const Register = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [_, setCookie] = useCookies(["jwt"]);
  const [form, setForm] = useState(registerFormat);
  const [isLoading, setIsLoading] = useState(false);
  //   const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFile = (e) => {
    const photo = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(photo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { username, email, photo, password, confirmPassword } = form;
    if (username === "" || email === "" || password === "") {
      return toast.warn("Invalid email or password!");
    }
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (password !== confirmPassword) {
      return toast.warn("Password mismatch!");
    }
    try {
      formData.append("username", username);
      formData.append("email", email);
      formData.append("photo", photo);
      formData.append("password", password);
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const user = data.user;
      setCookie("jwt", user.token);
      dispatch(
        setCredentials({
          ...user,
          photo: {
            ...user.photo,
            data: convertByteArrayToBase64(user.photo.data.data),
          },
        })
      );
      navigate("/");
      setForm(registerFormat);
    } catch (e) {
      toast.error(e?.data?.message || e.message);
    }
    setIsLoading(false);
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
        <>
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
              encType="multipart/form-data"
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
                id="username"
                type="text"
                label="Username"
                name="username"
                variant="filled"
                value={form.username}
                onChange={handleInputChange}
              />
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
                name="password"
                variant="filled"
                value={form.password}
                onChange={handleInputChange}
              />
              <TextField
                id="confirmPassword"
                type="password"
                label="Confirm password"
                name="confirmPassword"
                variant="filled"
                value={form.confirmPassword}
                onChange={handleInputChange}
              />
              <Typography>Choose a profile picture (Optional)</Typography>
              <TextField
                id="photo"
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                name="photo"
                onChange={handleFile}
              />
              <Button
                type="submit"
                variant="filled"
                sx={{
                  background: "#2145de",
                  color: "#FFF",
                  ":hover": {
                    color: "#000",
                    border: "1px solid #000",
                  },
                }}
              >
                Register
              </Button>
              <br />
              <span>Already have an account?</span>
              <Link to="/login"> Login here</Link>
            </form>
          </Container>
        </>
      )}
    </>
  );
};

export default Register;
