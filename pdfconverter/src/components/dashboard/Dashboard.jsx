import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleAdd = (e) => {
    setContent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAddMore = () => {
    setPageContent((prev) => [...prev, content]);
    setContent(contentFormat);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      // formData.append("id", new Date().getTime().toString());
      formData.append("file", file);
      const res = await fetch("http://localhost:5000/api/converter", {
        method: "POST",
        headers: {
          Authorization: `Bearer jwt=${cookie.jwt}`,
        },
        body: formData,
      });
      console.log(res);
    } catch (error) {
      alert(error);
    }
  };

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
          {/* {file && open && (
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
          )}   <div className="button-menu">
            {file &&
              (open || (
                <button onClick={() => setOpen(true)}>
                  Add Author details
                </button>
              ))}
            {open && <button onClick={handleAddMore}>Add another</button>}
          </div> */}
          {file && <button type="submit">Convert</button>}
        </form>

        {/* <div className="displayContent">
          {pageContent.map((content) => (
            <table className="content">
              <th colSpan={2}>Details of Autor- {content.name}</th>
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
            </table>
          ))}
        </div> */}
      </main>
    </>
  );
};

export default Dashboard;
