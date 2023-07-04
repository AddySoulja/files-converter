import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { logOut } from "../../redux/slices/authSlice";
import { contentFormat, pdfFormFormat } from "../../utils/templates";
import "./dashboard.css";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [cookie] = useCookies();
  const [pageContent, setPageContent] = useState([]);
  const [content, setContent] = useState(contentFormat);
  const [file, setFile] = useState(null);
  const [receivedFile, setReceivedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "mypdf.pdf");
    document.body.appendChild(link);
    link.click();
  };
  const addToList = () => {
    if (
      content.name === "" ||
      content.education === "" ||
      content.isbnNumber === "" ||
      content.address === ""
    )
      return alert("Please provide required author details before submitting.");
    setPageContent((prev) => [...prev, content]);
    setContent(contentFormat);
  };

  const handleAdd = (e) => {
    setContent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(pageContent);
      formData.append("content", JSON.stringify(pageContent));

      const res = await fetch("http://localhost:5000/api/converter", {
        method: "POST",
        headers: {
          Authorization: `Bearer jwt=${cookie.jwt}`,
        },
        body: formData,
      });
      const fileData = await res.json();

      const url = window.URL.createObjectURL(
        new Blob([new Uint8Array(fileData.file).buffer])
      );
      handleDownload(url);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    setOpen(false);
  }, [pageContent]);

  return (
    <>
      <header
        style={{
          display: "flex",
          backgroundColor: "#f1f1f1",
          justifyContent: "space-between",
          lineHeight: 0.5,
          padding: "0 85px",
          alignItems: "center",
        }}
      >
        <h1>File to PDF converter</h1>
        <div>
          <div>
            <p>USERNAME - {userInfo.username}</p>
            <p>E-MAIL - {userInfo.email}</p>
          </div>
          <button
            onClick={handleLogout}
            style={{ height: "35px", float: "right" }}
          >
            Log out
          </button>
        </div>
      </header>

      <main>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "300px",
            marginLeft: "50px",
          }}
        >
          <label htmlFor="file">Content</label>
          <input
            id="file"
            name="file"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
          />
          {file && open && (
            <div className="formData">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={content.name}
                  onChange={handleAdd}
                />
              </div>
              <div className="form-field">
                <label htmlFor="education">Education</label>
                <input
                  type="text"
                  name="education"
                  id="education"
                  value={content.education}
                  onChange={handleAdd}
                />
              </div>
              <div className="form-field">
                <label htmlFor="isbnNumber">ISBN Number</label>
                <input
                  type="text"
                  name="isbnNumber"
                  id="isbnNumber"
                  value={content.isbnNumber}
                  onChange={handleAdd}
                />
              </div>
              <div className="form-field">
                <label htmlFor="address">ADDRESS</label>
                <textarea
                  type="text"
                  name="address"
                  id="address"
                  value={content.address}
                  onChange={handleAdd}
                />
              </div>
            </div>
          )}

          {open || (file && <button type="submit">Convert</button>)}
        </form>
        <div className="button-menu">
          {file &&
            (open || (
              <button onClick={() => setOpen(true)}>Add Author details</button>
            ))}
          {open && content && <button onClick={addToList}>Add</button>}
          {pageContent.length > 0 && (
            <button onClick={() => setPageContent([])}>Clear Contents</button>
          )}
        </div>
        <div className="displayContent">
          {pageContent.map((content, idx) => (
            <table className="content" key={idx}>
              <thead>
                <tr>
                  <th colSpan={2}>Details of Autor- {content.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{content.name}</td>
                </tr>
                <tr>
                  <td>Education</td>
                  <td>{content.education}</td>
                </tr>
                <tr>
                  <td>ISBN Number</td>
                  <td>{content.isbnNumber}</td>
                </tr>
                <tr>
                  <td>ADDRESS</td>
                  <td>{content.address}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
