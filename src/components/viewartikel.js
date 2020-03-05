import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import Logo from "./contoh.webp";
import "./contoh2.css";

export default class ViewArtikel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_artikel: "",
      judul: "",
      isi: "",
      status: "",
      id_user: "",
      createdAt: "",
      komentars: [
        {
          id_user: "",
          isi_komentar: "",
          status: "",
          user: {
            id_user: "",
            name: ""
          }
        }
      ]
    };
  }
  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const id = this.props.match.params.id;
    axios.get("http://localhost:6767/artikelkomen/" + id).then(response => {
      this.setState(
        {
          judul: response.data.data.judul,
          isi: response.data.data.isi,
          komentars: response.data.data.komentars,
          createdAt: response.data.data.createdAt,
          id_user: response.data.data.id_user,
          name: response.data.data.komentars.name
        },
        () => {
          console.log(this.state.komentars.length);
        }
      );
    });
  }
  onDelete(e, id) {
    e.preventDefault();
    axios
      .delete(`http://localhost:6767/komentar/${id}`)
      .then(alert("Komentar terhapus!"));
    window.location.reload(false);
  }

  render() {
    return (
      <>
        <div className="jumbotron pt-5 pb-5">
          <img src={Logo} alt="..." className="rounded mb-3 mt-0" />
          <h2>{this.state.judul}</h2>
          <h5>
            Pada : {moment(this.state.createdAt).format(" DD / MMMM / YYYY")}
            {this.state.name}
          </h5>
          <hr />
          <p align="justify">{this.state.isi}</p>
        </div>
        <h2 class="page-header">Komentar</h2>

        {(() => {
          if (this.state.komentars.length === 0) {
            return (
              <div className="col-md-5">
                <h4>Tidak ada komentar</h4>
              </div>
            );
          }
        })()}
        {(() => {
          if (sessionStorage.getItem("Token")) {
            return (
              <div className="col-md-2">
                <Link to={"/tambahkomen/" + this.props.match.params.id}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mt-1"
                    width="10px"
                  >
                    <i className="fa fa-plus"> </i>
                    Tambah Komentar
                  </button>
                </Link>
              </div>
            );
          } else if (!sessionStorage.getItem("Token")) {
          }
        })()}
        <div class="container">
          {" "}
          <div class="row">
            <div class="col-md-8">
              {" "}
              <section class="comment-list">
                {this.state.komentars.map(komentars => {
                  return (
                    <>
                      <article class="row">
                        <div class="col-md-2 col-sm-2 hidden-xs">
                          <figure class="thumbnail">
                            <img
                              class="img-responsive"
                              src="http://www.tangoflooring.ca/wp-content/uploads/2015/07/user-avatar-placeholder.png"
                            />
                            <figcaption class="text-center">
                              {komentars.user.name}
                            </figcaption>
                          </figure>
                        </div>
                        <div class="col-md-10 col-sm-10">
                          <div class="panel panel-default arrow left">
                            <div class="panel-body">
                              <header class="text-left">
                                <time
                                  class="comment-date"
                                  datetime="16-12-2014 01:05"
                                >
                                  <i class="fa fa-clock-o"></i>{" "}
                                  {moment(komentars.createdAt).format(
                                    " DD / MMMM / YYYY"
                                  )}
                                </time>
                              </header>
                              <div class="comment-post">
                                <p>{komentars.isi_komentar}</p>
                              </div>
                              <p class="text-right">
                                <div className="col-md-4">
                                  {(() => {
                                    const role = sessionStorage.getItem(
                                      "Admin"
                                    );
                                    const id_user = sessionStorage.getItem(
                                      "Id"
                                    );

                                    if (
                                      String(komentars.id_user) ===
                                        String(id_user) ||
                                      role === "yes"
                                    ) {
                                      return (
                                        <button
                                          className="button btn-danger btn-sm mb-2"
                                          onClick={e =>
                                            this.onDelete(
                                              e,
                                              komentars.id_komentar
                                            )
                                          }
                                        >
                                          <i className="fa fa-trash"></i>
                                          Hapus
                                        </button>
                                      );
                                    }
                                  })()}
                                </div>
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </>
                  );
                })}
              </section>
            </div>
          </div>
        </div>
        <link
          href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      </>
    );
  }
}
