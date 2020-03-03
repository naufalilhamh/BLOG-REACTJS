import React, { useState } from "react";
import axios from "axios";

const TambahArtikel = () => {
  const [form, setValues] = useState({
    judul: "",
    isi: ""
  });
  const printValues = e => {
    e.preventDefault();
    console.log(form.judul, form.isi);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:6767/artikel/" + sessionStorage.getItem("Id"),
        {
          judul: form.judul,
          isi: form.isi
        }
      );
      // window.location.reload();
      if (result.status === 201) {
        alert("Data inserted sucessfuly!");
        window.location.replace("/listartikelid");
      } else {
        throw new Error("Failed to insert data!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div className="container">
      <div className="cardregis">
        <div className="title">Form Tambah Artikel</div>
        <form id="myform" onSubmit={handleSubmit} className="px-4 ma">
          <div className="form-group">
            <label className="labelbuku">Judul Artikel </label>
            <input
              className="form-control"
              value={form.judul}
              name="judul"
              onChange={updateField}
            />
          </div>
          <label className="labelbuku">Isi Artikel </label>
          <textarea
            className="form-control"
            value={form.isi}
            name="isi"
            id="textarea"
            onChange={updateField}
            rows="4"
            cols="50"
          />
          <div id="textarea_feedback"></div>
          <br />
          <button id="btnsubmit" className="mb-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default TambahArtikel;
