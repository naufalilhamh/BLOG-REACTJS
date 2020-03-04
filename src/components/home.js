import React from "react";
import Logo from "./buku.jpeg";
import { Jumbotron } from "reactstrap";

const Home = () => {
  const admin = sessionStorage.getItem("Admin");

  return (
    <Jumbotron>
      {(() => {
        if (admin === "yes") {
          return (
            <h2>
              Hello, Selamat Datang! Admin <hr />
            </h2>
          );
        } else if (admin === "no") {
          return (
            <h2>
              Hello, Selamat Datang! User
              <hr />
            </h2>
          );
        }
      })()}

      {/* <div className="p-3 my-2 rounded">
        <Toast>
          <ToastHeader>Ingat !</ToastHeader>
          <ToastBody>
            <span>
              Menuju Fullstack Web Developer <Spinner color="success" />
            </span>
          </ToastBody>
        </Toast>
      </div> */}
    </Jumbotron>
  );
};
export default Home;
