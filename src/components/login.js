import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import Logo from "./loglogin.png";

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
    // <div className="container">
    //   <div className="cardregis">
    //     <div className="title">Form Login User</div>
    //     <form onSubmit={handleSubmit} className="px-4 ma">
    //       <div className="form-group">
    //         <label className="labelbuku">Username </label>
    //         <input
    //           className="form-control"
    //           value={form.username}
    //           name="username"
    //           onChange={updateField}
    //           required
    //         />
    //       </div>
    //       <label className="labelbuku">Password </label>
    //       <input
    //         className="form-control"
    //         type="password"
    //         value={form.password}
    //         name="password"
    //         onChange={updateField}
    //         required
    //       />
    //       <br />
    //       <button
    //         type="submit"
    //         className="btn btn-outline-secondary btn-md mb-2"
    //       >
    //         Login
    //       </button>
    //       <br />
    //       <a href="/registeruser">
    //         <button
    //           type="button"
    //           className="btn btn-outline-secondary btn-md mb-2"
    //         >
    //           Register
    //         </button>
    //       </a>
    //     </form>
    //   </div>
    // </div>
    <>
      <link
        href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"
        rel="stylesheet"
        id="bootstrap-css"
      />
      <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
      <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

      <script src="http://mymaplist.com/js/vendor/TweenLite.min.js"></script>

      <div class="container">
        <div class="row vertical-offset-100">
          <div class="col-md-4 col-md-offset-4">
            <center>
              <img
                src={Logo}
                alt="..."
                className="rounded mb-3 mt-0"
                width="130px"
                height="100px"
              />
            </center>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">Silahkan Login</h3>
              </div>
              <div class="panel-body">
                <form
                  autoComplete="false"
                  accept-charset="UTF-8"
                  role="form"
                  onSubmit={handleSubmit}
                  className="px-4 ma"
                >
                  <fieldset>
                    <div class="form-group">
                      <input
                        autoComplete="off"
                        className="form-control"
                        value={form.username}
                        name="username"
                        onChange={updateField}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        className="form-control"
                        type="password"
                        value={form.password}
                        name="password"
                        onChange={updateField}
                        required
                      />
                    </div>
                    <hr />
                    <input
                      class="btn btn-lg btn-secondary btn-block"
                      type="submit"
                      value="Login"
                    />
                    <a href="/registeruser">
                      <input
                        class="btn btn-lg btn-secondary btn-block mt-2"
                        type="button"
                        value="Register"
                      />
                    </a>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TambahBuku;
