import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function App(props) {
  const url = "http://localhost:6767/artikelsem/";
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    axios.get(url).then(json => setData(json.data));
  }, []);
  function onSembunyi(id) {
    axios
      .put(`http://localhost:6767/artikelsembunyi/${id}`)
      .then(alert("Artikel Berhasil Disembunyikan"));
    window.location.reload(false);
  }
  function onTampil(id) {
    axios
      .put(`http://localhost:6767/artikeltampil/${id}`)
      .then(alert("Artikel Berhasil Ditampilkan"));
    window.location.reload(false);
  }

  function onDelete(id) {
    axios
      .delete(`http://localhost:6767/artikel/${id}`)
      .then(alert("Artikel Berhasil Dihapus"));
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
                  <span className="badge badge-pill badge-warning">
                    Tidak Tampil
                  </span>
                );
              } else {
                return (
                  <span className="badge badge-pill badge-success">Tampil</span>
                );
              }
            })()}
          </td>
          <td>
            {(() => {
              if (artikel.status === "hide") {
                return (
                  <>
                    <Link to={"/viewartikel/" + artikel.id_artikel}>
                      <button
                        type="button"
                        className="btn btn-success btn-sm mt-1"
                        width="10px"
                      >
                        <i className="fa fa-eye"> </i> Lihat Artikel
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary  btn-sm mt-1"
                      onClick={() => onTampil(artikel.id_artikel)}
                    >
                      <i className="fa fa-check"></i> Tampilkan Artikel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger  btn-sm mt-1"
                      onClick={() => onDelete(artikel.id_artikel)}
                    >
                      <i className="fa fa-trash"></i> Hapus
                    </button>
                  </>
                );
              } else {
                return (
                  <>
                    <Link to={"/viewartikel/" + artikel.id_artikel}>
                      <button
                        type="button"
                        className="btn btn-success btn-sm mt-1"
                        width="10px"
                      >
                        <i className="fa fa-eye"> </i> Lihat Artikel
                      </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-warning  btn-sm mt-1"
                      onClick={() => onSembunyi(artikel.id_artikel)}
                    >
                      <i className="fa fa-window-close"></i> Sembunyikan
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger  btn-sm mt-1"
                      onClick={() => onDelete(artikel.id_artikel)}
                    >
                      <i className="fa fa-trash"></i> Hapus
                    </button>
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
