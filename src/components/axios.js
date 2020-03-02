import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import moment from "moment";
import axios from "axios";

function App() {
  const url = "http://localhost:6767/books";
  const [data, setData] = useState({ data: [] });
  const role = sessionStorage.getItem("Role");
  useEffect(() => {
    axios.get(url).then(json => setData(json.data));
  }, []);

  function onDelete(id) {
    axios.delete(`http://localhost:6767/books/${id}`).then(alert("Terhapus"));
    window.location.reload(false);
  }
  function pinjambuku(id_buku) {
    const id_user = sessionStorage.getItem("Id");
    axios
      .post("http://localhost:6767/orders/" + id_buku + "/" + id_user)
      .then(alert("Peminjaman Berhasil Ditambahkan"));
    window.location.replace("/listpinjamid");
    console.log(id_buku);
    console.log(id_user);
  }
  // let tanggalformat = moment(.format("YYYY-MM-DD"));

  const renderTable = () => {
    return data.data.map(books => {
      return (
        <tr key={books.id}>
          <td>{books.id}</td>
          <td>{books.title}</td>
          <td>{books.author}</td>
          <td> {moment(books.published_date).format("DD - MMMM - YYYY")}</td>
          <td>{books.page}</td>
          <td>{books.language}</td>
          <td>{books.publisher_id}</td>
          <td>
            {(() => {
              if (role === "ADMIN") {
                return (
                  <>
                    <Link to={"/updatebuku/" + books.id}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm mt-1"
                      >
                        <i className="fa fa-gear"></i>
                        Edit
                      </button>
                    </Link>

                    <button
                      type="button"
                      className="btn btn-danger  btn-sm mt-1"
                      onClick={() => onDelete(books.id)}
                    >
                      <i className="fa fa-trash"></i>
                      Hapus
                    </button>
                  </>
                );
              } else {
                return (
                  <button
                    type="button"
                    className="btn btn-success btn-sm mt-1"
                    onClick={() => pinjambuku(books.id)}
                  >
                    <i className="fa fa-check"> </i>
                    Pilih Buku
                  </button>
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
      <h1 id="title">Daftar Buku</h1>
      <div className="col-md-2">
        {(() => {
          if (role === "ADMIN") {
            return (
              <Link to="/tambahbuku">
                <button type="button" className="btn btn-success btn-sm mb-1">
                  <i className="fa fa-plus"> </i>
                  Tambah Buku
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
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Published Date</th>
            <th>Pages</th>
            <th>Language</th>
            <th>Publisher Id</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
}
export default App;
