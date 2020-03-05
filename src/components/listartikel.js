import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function App(props) {
  const id_user = sessionStorage.getItem("Id");
  const urluser = "http://localhost:6767/artikels/" + id_user;
  const urladmin = "http://localhost:6767/artikel";
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    if (sessionStorage.getItem("Admin") === "no") {
      axios.get(urluser).then(json => setData(json.data));
    } else {
      axios.get(urladmin).then(json => setData(json.data));
    }
  }, []);
  console.log(data.data);

  function onDelete(id) {
    axios.delete(`http://localhost:6767/artikel/${id}`).then(alert("Terhapus"));
    window.location.reload(false);
  }

  const renderTable = () => {
    let no = 1;
    let admin = sessionStorage.getItem("Admin");
    return data.data.map(artikel => {
      return (
        <tr key={artikel.id_artikel}>
          <td>{no++}</td>
          <td>{artikel.judul}</td>
          <td>{artikel.isi}</td>
          <td>{artikel.user.name}</td>
          <td>{moment(artikel.createdAt).format("DD - MMMM - YYYY")}</td>
          <td>
            {(() => {
              if (artikel.status === "hide") {
                return (
                  <span class="badge badge-pill badge-warning">
                    Tidak Tampil
                  </span>
                );
              } else {
                return (
                  <span class="badge badge-pill badge-success">Tampil</span>
                );
              }
            })()}
          </td>
          <td>
            {(() => {
              if (admin === "yes") {
                return (
                  <>
                    <Link to={"/reviewartikel/" + artikel.id_artikel}>
                      <button
                        type="button"
                        className="btn btn-warning btn-sm mt-1"
                        width="10px"
                      >
                        <i className="fa fa-eye"> </i>
                        Review Artikel
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger  btn-sm mt-1"
                      onClick={() => onDelete(artikel.id_artikel)}
                    >
                      <i className="fa fa-trash"></i>
                      Hapus
                    </button>
                  </>
                );
              } else if (admin === "no") {
                return (
                  <>
                    <Link to={"/viewartikel/" + artikel.id_artikel}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm mt-1"
                        width="10px"
                      >
                        <i className="fa fa-eye"> </i>
                        View Artikel
                      </button>
                    </Link>
                  </>
                );
              }
            })()}
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      {(() => {
        if (sessionStorage.getItem("Admin") === "no") {
          return <h4 id="title">Daftar Artikel Anda </h4>;
        } else {
          return (
            <>
              <h4 id="title">Daftar Artikel </h4>
            </>
          );
        }
      })()}

      <div className="col-md-2">
        {(() => {
          if (sessionStorage.getItem("Admin") === "no") {
            return (
              <Link to="/tambahartikel">
                <button type="button" className="btn btn-success btn-sm mb-1">
                  <i className="fa fa-plus"> </i>
                  Tambah Artikel
                </button>
              </Link>
            );
          } else {
            return <></>;
          }
        })()}
      </div>
      <table id="tabelbor" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Isi</th>
            <th>Penulis</th>
            <th>Tanggal Pembuatan</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}
export default App;
