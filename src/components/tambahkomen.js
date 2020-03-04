import React, { useState } from "react";
import axios from "axios";

const TambahArtikel = props => {
  const [form, setValues] = useState({
    isi_komentar: ""
  });
  const printValues = e => {
    e.preventDefault();
    console.log(form.isi_komentar);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:6767/komentar/" +
          props.match.params.id +
          "/" +
          sessionStorage.getItem("Id"),
        {
          isi_komentar: form.isi_komentar
        }
      );
      // window.location.reload();
      if (result.status === 201) {
        alert("Data inserted sucessfuly!");
        window.location.replace("/allartikel");
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
      <div className="cardkomen">
        <div className="titlekomen">Form Tambah Komentar</div>
        <form id="myform" onSubmit={handleSubmit} className="px-4 ma">
          <label className="labelkomen">Isi Komentar </label>
          <textarea
            className="form-control"
            value={form.isi_komentar}
            name="isi_komentar"
            id="textarea"
            onChange={updateField}
            rows="4"
            cols="50"
          />
          {/* <div id="textarea_feedback"></div> */}
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
