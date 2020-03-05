import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Logo from "./contoh.webp";
import "./homegues.css";
import axios from "axios";

function App(props) {
  const url = "http://localhost:6767/artikelg";
  const [data, setData] = useState({
    data: [
      {
        id_artikel: "",
        judul: "",
        isi: "",
        id_user: "",
        status: "",
        createdAt: "",
        user: {
          id_user: "",
          name: ""
        }
      }
    ]
  });

  useEffect(() => {
    axios.get(url).then(json => setData(json.data));
  }, []);
  console.log(data);

  const renderArtikel = () => {
    let no = 1;
    return data.data.map(artikel => {
      return (
        <>
          <link
            href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
            rel="stylesheet"
            id="bootstrap-css"
          />
          <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
          <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="panel panel-default">
                  <div class="panel-heading">
                    <strong>
                      <a class="post-title">{artikel.judul}</a>
                    </strong>
                  </div>
                  <div class="panel-body">
                    <div class="col-md-4">
                      <img src={Logo} alt="" width="300px" height="150" />
                    </div>
                    <p>{artikel.isi.substr(0, 200)}.....</p>
                    <div className="col-md-3">
                      <Link to={"/viewartikel/" + artikel.id_artikel}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm mt-1"
                          width="10px"
                        >
                          <i className="fa fa-eye"> </i> Lihat Selengkapnya
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div class="panel-footer">
                    <span class="glyphicon glyphicon-user" id="start"></span> 
                    <label id="started">Dari :</label> {artikel.user.name}
                    {" , "}
                    <span class="glyphicon glyphicon-time" id="start"></span> 
                    <label id="started">Pada :</label>{" "}
                    {moment(artikel.createdAt).format(" DD / MMMM / YYYY")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  };
  return <div>{renderArtikel()}</div>;
}
export default App;
