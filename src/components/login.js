import React, { useState } from "react";
import axios from "axios";
// import "./css/login.css";
const TambahBuku = () => {
  const [form, setValues] = useState({
    username: "",
    password: ""
  });
  const printValues = e => {
    e.preventDefault();
    console.log(form.username, form.password);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios
        .post("http://localhost:6767/login", {
          username: form.username,
          password: form.password
        })
        .then(res => {
          const token = res.data.accessToken;
          const admin = res.data.admin;
          const id_user = res.data.id_user;
          // console.log(token);
          sessionStorage.setItem("Token", token);
          sessionStorage.setItem("Admin", admin);
          sessionStorage.setItem("Id", id_user);

          console.log(res);
          alert("Login Berhasil");
          window.location.replace("/");
        });
      //
    } catch (err) {
      console.log(err);
      alert(err.response.data.reason);
      // window.location.reload();
    }
  };
  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="container">
      <div className="cardregis">
        <div className="title">Form Login User</div>
        <form onSubmit={handleSubmit} className="px-4 ma">
          <div className="form-group">
            <label className="labelbuku">Username </label>
            <input
              className="form-control"
              value={form.username}
              name="username"
              onChange={updateField}
              required
            />
          </div>
          <label className="labelbuku">Password </label>
          <input
            className="form-control"
            type="password"
            value={form.password}
            name="password"
            onChange={updateField}
            required
          />
          <br />
          <button
            type="submit"
            className="btn btn-outline-secondary btn-md mb-2"
          >
            Login
          </button>
          <br />
          <a href="/registeruser">
            <button
              type="button"
              className="btn btn-outline-secondary btn-md mb-2"
            >
              Register
            </button>
          </a>
        </form>
      </div>
    </div>
  );
};
export default TambahBuku;
