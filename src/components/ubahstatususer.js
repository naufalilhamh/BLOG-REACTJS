import React, { Component } from "react";
import axios from "axios";

export default class UbahStatusUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: "",
        username: "",
        email: "",
        admin: "",
        status: ""
      }
    };
  }
  componentDidMount() {
    this.getUser();
  }

  getUser() {
    let id = this.props.match.params.id;
    axios.get("http://localhost:6767/users/" + id).then(response => {
      this.setState(
        {
          status: response.data.data.status
        },
        () => {
          // console.log(response.data.data.status);
        }
      );
    });
  }

  editStatus(newUser) {
    let id = this.props.match.params.id;
    axios
      .request({
        method: "put",
        url: "http://localhost:6767/users/" + id,
        data: newUser
      })
      .then(response => {
        this.props.history.push("/listuser");
      })
      .catch(err => console.log(err));
  }

  ambilPerubahan(e) {
    if (this.state.status === "nonaktif") {
      const newUser = {
        status: "aktif"
      };
      this.editStatus(newUser);
    } else {
      const newUser = {
        status: "nonaktif"
      };
      this.editStatus(newUser);
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="cardregis">
          <div className="title">Update Status User</div>
          <form onSubmit={this.ambilPerubahan.bind(this)}>
            <div className="container mt-5">
              <div className="form-group">
                <label>Status Sebelumnya</label>
                <input
                  name="status"
                  type="text"
                  className="form-control"
                  value={this.state.status}
                  readOnly
                />
              </div>

              <button
                type="submit"
                value="Submit"
                className="btn btn-primary mb-2"
              >
                Update Status
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
