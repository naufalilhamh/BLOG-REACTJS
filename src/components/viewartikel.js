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
      artikel: {
        id_artikel: "",
        judul: "",
        isi: "",
        status: "",
        id_user: "",
        createdAt: "",
        user: {
          id_user: "",
          name: ""
        },
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
      },
      form: {
        isi_komentar: ""
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const id = this.props.match.params.id;
    axios.get("http://localhost:6767/artikelkomen/" + id).then(response => {
      this.setState(
        {
          artikel: {
            judul: response.data.data.judul,
            isi: response.data.data.isi,
            user: response.data.data.user,
            komentars: response.data.data.komentars,
            createdAt: response.data.data.createdAt,
            id_user: response.data.data.id_user,
            name: response.data.data.komentars.name
          }
        },
        () => {
          console.log(response.data.data.user.name);
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
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      form: {
        [name]: value
      }
    });
  }
  handleSubmit(event) {
    axios
      .post(
        "http://localhost:6767/komentar/" +
          this.props.match.params.id +
          "/" +
          sessionStorage.getItem("Id"),
        {
          isi_komentar: this.state.form.isi_komentar
        }
      )
      .then(alert("Komentar Berhasil Ditambahkan, Menunggu Persetujuan Admin"));
    window.location.reload(false);

    event.preventDefault();
  }

  render() {
    return (
      <>
        <div className="jumbotron pt-5 pb-5">
          <img src={Logo} alt="..." className="rounded mb-3 mt-0" />
          <h2>{this.state.artikel.judul}</h2>
          <h5>
            Dari : {this.state.artikel.user.name} <br />
            Pada :{" "}
            {moment(this.state.artikel.createdAt).format(" DD / MMMM / YYYY")}
          </h5>
          <hr />
          <p align="justify">{this.state.artikel.isi}</p>
        </div>
        <h2 class="page-header">Komentar</h2>
        <link
          href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
          rel="stylesheet"
          id="bootstrap-css"
        />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
        <link
          rel="stylesheet"
          href="http://fontawesome.io/assets/font-awesome/css/font-awesome.css"
        />
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              {(() => {
                if (sessionStorage.getItem("Token")) {
                  return (
                    <>
                      <div class="widget-area no-padding blank mb-5">
                        <div class="status-upload">
                          <form onSubmit={this.handleSubmit}>
                            <textarea
                              type="text"
                              name="isi_komentar"
                              placeholder="Silahkan Sisipkan Komentar Anda Disini!"
                              value={this.state.form.isi_komentar}
                              onChange={this.handleInputChange}
                            ></textarea>
                            <div className="col-md-3 mb-3">
                              <button
                                type="submit"
                                class="btn btn-success green"
                              >
                                <i class="fa fa-share"></i> Share
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </>
                  );
                } else if (!sessionStorage.getItem("Token")) {
                }
              })()}
              {(() => {
                if (this.state.artikel.komentars.length === 0) {
                  return (
                    <div className="col-md-5">
                      <h4>Tidak ada komentar</h4>
                    </div>
                  );
                }
              })()}

              <section class="comment-list">
                {this.state.artikel.komentars.map(komentars => {
                  return (
                    <>
                      <article class="row">
                        <div class="col-md-2 col-sm-2 hidden-xs ">
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
