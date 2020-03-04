import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function App(props) {
  const url = "http://localhost:6767/komentar";
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    axios.get(url).then(json => setData(json.data));
    console.log(data);
  }, []);

  function onDelete(id) {
    console.log(id);

    axios
      .delete(`http://localhost:6767/komentar/${id}`)
      .then(alert("Komentar Terhapus"));
    window.location.reload(false);
  }
  function onTampilkan(id) {
    axios
      .put(`http://localhost:6767/komentar/${id}`)
      .then(alert("Komentar Sudah Di Tampilkan"));
    window.location.reload(false);
  }

  const renderTable = () => {
    let no = 1;
    return data.data.map(komentar => {
      return (
        <tr key={komentar.id_komentar}>
          <td>{no++}</td>
          <td>{komentar.isi_komentar}</td>
          <td>{komentar.user.name}</td>
          <td>
            {(() => {
              if (komentar.status === "hide") {
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
            <>
              <button
                type="button"
                className="btn btn-primary btn-sm mt-1"
                width="10px"
                onClick={() => onTampilkan(komentar.id_komentar)}
              >
                <i className="fa fa-check"> </i>
                Tampilkan
              </button>

              <button
                type="button"
                className="btn btn-danger  btn-sm mt-1"
                onClick={() => onDelete(komentar.id_komentar)}
              >
                <i className="fa fa-trash"></i>
                Hapus
              </button>
            </>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <>
        <h4 id="title">Daftar Komentar </h4>
      </>
      <table id="tabelbor" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Isi Komentar</th>
            <th>Pembuat</th>
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
