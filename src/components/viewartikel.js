import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

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
    let id = this.props.match.params.id;
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

  render() {
    return (
      <>
        <div className="jumbotron">
          <h2>{this.state.judul}</h2>
          <hr />
          <p>{this.state.isi}</p>
          <p>{moment(this.state.createdAt).format(" DD / MMMM / YYYY")}</p>
        </div>

        <div class="card">
          <div class="card-body">Komentar</div>
        </div>

        {this.state.komentars.map(komentars => {
          return (
            <div class="card">
              <div class="card-body">
                {komentars.isi_komentar}
                <br />
                <small>
                  From {komentars.user.name}, On :{" "}
                  {moment(komentars.createdAt).format(" DD / MMMM / YYYY")}
                </small>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
