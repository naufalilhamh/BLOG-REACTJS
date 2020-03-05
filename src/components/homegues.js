import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Logo from "./contoh.webp";
import "./contoh.css";
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
          <div className="jumbotron pt-5 pb-5">
            <img src={Logo} alt="..." class="rounded mb-3 mt-0" />
            <h2>{artikel.judul}</h2>
            <h9>
              Dari : {artikel.user.name}, Pada :{" "}
              {moment(artikel.createdAt).format(" DD / MMMM / YYYY")}
            </h9>
            <hr />
            <p max="10">{artikel.isi.substr(0, 50)}.....</p>
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
        </>
      );
    });
  };
  return (
    <>
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
      {/* <section id="team" class="pb-5"> */}
      {/* <div class="container"> */}
      {/* <h5 class="section-title h1">OUR TEAM</h5> */}
      {/* <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <div
            class="image-flip"
            ontouchstart="this.classList.toggle('hover');"
          >
            <div class="mainflip">
              <div class="frontside">
                <div class="card">
                  <div class="card-body text-center">
                    <p>
                      <img
                        class=" img-fluid"
                        src="https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"
                        alt="card image"
                      />
                    </p>
                    <h4 class="card-title">Sunlimetech</h4>
                    <p class="card-text">
                      This is basic card with image on top, title, description
                      and button.
                    </p>
                    <a href="#" class="btn btn-primary btn-sm">
                      <i class="fa fa-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="backside">
                <div class="card">
                  <div class="card-body text-center mt-4">
                    <h4 class="card-title">Sunlimetech</h4>
                    <p class="card-text">
                      This is basic card with image on top, title, description
                      and button.This is basic card with image on top, title,
                      description and button.This is basic card with image on
                      top, title, description and button.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* </div> */}
      {/* </section> */}
    </>
  );
}
export default App;
