import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { logOut } from "../../redux/slices/authSlice";
import { contentFormat, pdfFormFormat } from "../../utils/templates";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [cookie] = useCookies();
  const [pageContent, setPageContent] = useState([]);
  const [content, setContent] = useState(contentFormat);
  const [existingFile, setExistingFile] = useState(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", new Date().getTime().toString());
    formData.append("existingFile", existingFile);
    formData.append("newContent", content);

    try {
      const res = await fetch("http://localhost:5000/api/users/converter", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer jwt=${cookie.jwt}`,
        },
        body: formData,
      });
      console.log(await res.json());
    } catch (error) {
      alert(error);
    }
  };
  const handleAddMoreContent = () => {
    setPageContent((prev) => ({ ...prev, content }));
    setContent(contentFormat);
  };
  const handleAddContent = (e) => {
    setContent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handlePdfInput = (e) => {
    setExistingFile(e.target.files[0]);
  };
  return (
    <>
      <h1>Dashboard</h1>
      <h3>Username: {userInfo.username}</h3>
      <h3>Email: {userInfo.email}</h3>
      <button onClick={handleLogout}>Log out</button>
      <h1>FILE TO PDF CONVERTER</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          marginLeft: "50px",
        }}
      >
        <label htmlFor="pdf">Content</label>
        <input
          id="pdf"
          name="existingFile"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handlePdfInput}
        />
        <label htmlFor="name">Name</label>
        <textarea
          type="text"
          name="name"
          id="name"
          onChange={handleAddContent}
        />
        <label htmlFor="education">Education</label>
        <textarea
          type="text"
          name="education"
          id="education"
          onChange={handleAddContent}
        />
        <label htmlFor="isbnNumber">ISBN Number</label>
        <textarea
          type="text"
          name="isbnNumber"
          id="isbnNumber"
          onChange={handleAddContent}
        />
        <label htmlFor="address">ADDRESS</label>
        <textarea
          type="text"
          name="address"
          id="address"
          onChange={handleAddContent}
        />
        <button type="submit">Convert</button>
      </form>
    </>
  );
};

export default Dashboard;
