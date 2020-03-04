import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

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
          createdAt: response.data.data.createdAt
        },
        () => {
          console.log(this.state);
        }
      );
    });
  }
  onDelete(e, id) {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/comments/${id}`)
      .then(alert("Comment deleted!"));
    window.location.reload(false);
  }

  render() {
    return (
      <>
        <div className="jumbotron">
          <h2>{this.state.judul}</h2>
          <h9>
            Pada : {moment(this.state.createdAt).format(" DD / MMMM / YYYY")}
          </h9>
          <hr />
          <p max="10">{this.state.isi}</p>
        </div>

        <div class="card">
          <div class="card-header">Komentar</div>
        </div>

        {this.state.komentars.map(komentars => {
          return (
            <div class="card">
              <div class="card-body mb-2">
                {komentars.isi_komentar}
                <br />
                <small>
                  From {komentars.user.name}, On :{" "}
                  {moment(komentars.createdAt).format(" DD / MMMM / YYYY")}
                </small>
                {/* <button
                  className="button btn-danger btn-sm mb-2"
                  onClick={e => this.onDelete(e, komentars.id)}
                >
                  <i class="fa fa-trash"></i>
                  Hapus
                </button> */}
              </div>
            </div>
          );
        })}
        {(() => {
          if (sessionStorage.getItem("Token")) {
            return (
              <div class="card">
                <div class="card-header">
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
              </div>
            );
          } else if (!sessionStorage.getItem("Token")) {
          }
        })()}
      </>
    );
  }
}
