import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

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
        <div className="jumbotron">
          <h2>{artikel.judul}</h2>
          <h9>
            By : {artikel.user.name}, On :{" "}
            {moment(artikel.createdAt).format(" DD / MMMM / YYYY")}
          </h9>
          <hr />
          <p max="10">{artikel.isi}</p>
          <div className="col-md-3">
            <Link to={"/viewartikel/" + artikel.id_artikel}>
              <button
                type="button"
                className="btn btn-secondary btn-sm mt-1"
                width="10px"
              >
                <i className="fa fa-eye"> </i>
                Lihat Selengkapnya
              </button>
            </Link>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      {/* <h1 id="title">Selamat Membaca ^-^ </h1> */}
      <div className="col-md-2">
        {/* <input
          type="text"
          className="search form-control mb-2"
          placeholder="Pencarian"
        /> */}
      </div>
      {renderArtikel()}
    </div>
  );
}
export default App;
