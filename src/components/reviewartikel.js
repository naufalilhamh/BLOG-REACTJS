import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

export default class ReviewArtikel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        id_artikel: "",
        judul: "",
        isi: "",
        status: "",
        id_user: "",
        createdAt: "",
        user: {
          name: ""
        }
      }
    };
  }
  componentDidMount() {
    this.getUser();
  }

  getUser() {
    let id = this.props.match.params.id;
    axios.get("http://localhost:6767/artikel/" + id).then(response => {
      this.setState(
        {
          status: response.data.data.status,
          judul: response.data.data.judul,
          isi: response.data.data.isi,
          name: response.data.data.user.name,
          createdAt: response.data.data.createdAt
        },
        () => {
          // console.log(response.data.data);
        }
      );
    });
  }

  editStatus(newUser) {
    let id = this.props.match.params.id;
    axios
      .request({
        method: "put",
        url: "http://localhost:6767/artikel/" + id,
        data: newUser
      })
      .then(response => {
        alert(`Artikel dengan ID ${id}, Sudah bisa di baca ! `);
        this.props.history.push("/listartikel");
      })
      .catch(err => console.log(err));
  }

  ambilPerubahan(e) {
    if (this.state.status === "hide") {
      const newUser = {
        status: "show"
      };
      this.editStatus(newUser);
    } else {
      const newUser = {
        status: "hide"
      };
      this.editStatus(newUser);
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="cardregis">
          <div className="title">Review Artikel</div>
          <form onSubmit={this.ambilPerubahan.bind(this)}>
            <div className="container mt-5">
              <div className="form-group">
                <label className="labelbuku">Judul Artikel </label>
                <input
                  className="form-control"
                  value={this.state.judul}
                  name="judul"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="labelbuku">Isi Artikel </label>
                <textarea
                  className="form-control"
                  value={this.state.isi}
                  name="isi"
                  readOnly
                  rows="4"
                  cols="50"
                />
              </div>
              <div className="form-group">
                <label className="labelbuku">Nama Penulis </label>
                <input
                  className="form-control"
                  value={this.state.name}
                  name="name"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="labelbuku">Tanggal Dibuat</label>
                <input
                  className="form-control"
                  value={moment(this.state.createdAt).format(
                    "DD - MMMM - YYYY"
                  )}
                  name="createdAt"
                  readOnly
                />
              </div>
              <input
                name="status"
                type="text"
                hidden
                className="form-control"
                value={this.state.status}
                readOnly
              />

              <button
                type="submit"
                value="Submit"
                className="btn btn-primary mb-2"
              >
                <i className="fa fa-eye"></i>
                Tampilkan Artikel
              </button>
              <button
                type="button"
                className="btn btn-success  btn-sm mt-1 mb-2"
                onClick={this.props.history.goBack}
              >
                <i className="fa fa-arrow-left"></i>
                Kembali
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
