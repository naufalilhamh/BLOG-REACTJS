import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./register.css";

// import "../../src/formcss.css";

//classname="px-2"

export default function App() {
  const { register, errors, handleSubmit, watch } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async data => {
    console.log(data);
    axios
      .post(`http://localhost:6767/register`, {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
        admin: "no",
        status: "nonaktif"
      })
      .then(alert("Register successful, Tunggu Approve Admin!"));
    // document.getElementById("registerbookform").reset();
    window.location.replace("/");
  };

  return (
    // <div className="container">
    //   <div className="cardregis">
    //     <div className="title">Form Register User</div>
    //     <form id="myForm" onSubmit={e => e.preventDefault()} className="px-4">
    //       <div className="form-group">
    //         <label className="labelbuku">Nama </label>
    //         <input
    //           className="form-control"
    //           type="text"
    //           placeholder="Name"
    //           name="name"
    //           ref={register({
    //             required: "Jangan Kosongkan Nama!",
    //             minLength: {
    //               value: 5,
    //               message: "Minimal 5 Huruf!"
    //             }
    //           })}
    //         />
    //         {errors.name && <p>{errors.name.message}</p>}
    //       </div>
    //       <div className="form-group">
    //         <label className="labelbuku">Username</label>
    //         <input
    //           className="form-control"
    //           type="text"
    //           placeholder="Username"
    //           name="username"
    //           ref={register({
    //             required: "Jangan Kosongkan Username!",
    //             minLength: {
    //               value: 5,
    //               message: "Minimal 5 karakter!"
    //             }
    //           })}
    //         />
    //         {errors.username && <p>{errors.username.message}</p>}
    //       </div>
    //       <div className="form-group">
    //         <label className="labelbuku">Email</label>
    //         <input
    //           className="form-control"
    //           type="text"
    //           placeholder="Email"
    //           name="email"
    //           ref={register({
    //             required: "Jangan Kosongkan Emai!",
    //             pattern: {
    //               value: /^\S+@\S+$/i,
    //               message: "Bukan Email!"
    //             }
    //           })}
    //         />
    //         {errors.email && <p>{errors.email.message}</p>}
    //       </div>

    //       <div className="form-group">
    //         <label className="labelbuku">Password</label>
    //         <input
    //           className="form-control"
    //           name="password"
    //           type="password"
    //           ref={register({
    //             required: "Jangan Kosongkan Password",
    //             minLength: {
    //               value: 8,
    //               message: "Minimal 8 Digit Password"
    //             }
    //           })}
    //         />
    //         {errors.password && <p>{errors.password.message}</p>}
    //       </div>

    //       <div className="form=group">
    //         <label className="labelbuku">Repeat password</label>
    //         <input
    //           className="form-control"
    //           name="password_repeat"
    //           type="password"
    //           ref={register({
    //             validate: value =>
    //               value === password.current || "Password Ga Sesuai"
    //           })}
    //         />
    //         {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
    //       </div>

    //       <hr />

    //       <button
    //         type="submit"
    //         onClick={handleSubmit(onSubmit)}
    //         className="btn btn-outline-secondary btn-md mb-2"
    //       >
    //         Register
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:400,700"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      <div class="signup-form">
        <form onSubmit={e => e.preventDefault()} className="px-4">
          <h2>Register User</h2>
          <hr />
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <i class="fa fa-user"></i>
              </span>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                name="name"
                ref={register({
                  required: "Jangan Kosongkan Nama!",
                  minLength: {
                    value: 5,
                    message: "Minimal 5 Huruf!"
                  }
                })}
              />
            </div>
            {errors.name && <small>{errors.name.message}</small>}
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <i class="fa fa-user"></i>
              </span>
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                ref={register({
                  required: "Jangan Kosongkan Username!",
                  minLength: {
                    value: 5,
                    message: "Minimal 5 karakter!"
                  }
                })}
              />
            </div>
            {errors.username && <small>{errors.username.message}</small>}
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <i class="fa fa-paper-plane"></i>
              </span>
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                name="email"
                ref={register({
                  required: "Jangan Kosongkan Emai!",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Bukan Email!"
                  }
                })}
              />
            </div>
            {errors.email && <small>{errors.email.message}</small>}
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <i class="fa fa-lock"></i>
                <i class="fa fa-check"></i>
              </span>
              <input
                className="form-control"
                name="password"
                placeholder="Password"
                type="password"
                ref={register({
                  required: "Jangan Kosongkan Password",
                  minLength: {
                    value: 8,
                    message: "Minimal 8 Digit Password"
                  }
                })}
              />
            </div>
            {errors.password && <small>{errors.password.message}</small>}
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <i class="fa fa-lock"></i>
                <i class="fa fa-check"></i>
              </span>
              <input
                placeholder="Konfirmasi Password"
                className="form-control"
                name="password_repeat"
                type="password"
                ref={register({
                  validate: value =>
                    value === password.current || "Password Ga Sesuai"
                })}
              />
            </div>{" "}
            {errors.password_repeat && (
              <small>{errors.password_repeat.message}</small>
            )}
          </div>
          <div class="form-group">
            <hr />
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="btn btn-outline-secondary btn-md mb-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
