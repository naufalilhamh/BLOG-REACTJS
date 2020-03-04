import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home";
import Main from "./layouts/main";
import ListArtikel from "./components/listartikel";
import TambahBuku from "./components/tambahbuku";
import TambahArtikel from "./components/tambahartikel";
import Notfound from "./components/notfound";
import Updatebuku from "./components/ubahbuku";
import RegisterUser from "./components/registeruser";
import Logout from "./components/logout";
import Login from "./components/login";
import ListUser from "./components/listuser";
import ListKomentar from "./components/listkomentar";
import UpdateStatusUser from "./components/ubahstatususer";
import UpdateRole from "./components/updaterole";
import PinjamBuku from "./components/pinjambuku";
import ListPinjamPerID from "./components/listpinjam";
import DetailPinjam from "./components/detailpinjam";
import ReviewArtikel from "./components/reviewartikel";
import HomeGuess from "./components/homegues";
import ViewArtikel from "./components/viewartikel";
import TambahKomen from "./components/tambahkomen";
import SemuaArtikel from "./components/allartikel";
// import Profile from "./components/profile";
// import About from "./components/about";
// import Validasi from "./components/challenge-validasi";s
// import Form from "./validasi/FormHook";
// import MultiHandling from "./components/multihandling";
// import Handling from "./components/handling";
const admin = sessionStorage.getItem("Admin");
const routing = (
  <Router>
    <Switch>
      <Main>
        {(() => {
          if (admin === "yes") {
            return (
              <>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/listartikel" component={ListArtikel} />
                  <Route path="/allartikel" component={SemuaArtikel} />
                  <Route path="/viewartikel/:id" component={ViewArtikel} />

                  <Route path="/listkomentar" component={ListKomentar} />
                  <Route path="/reviewartikel/:id" component={ReviewArtikel} />
                  <Route path="/listuser" component={ListUser} />
                  <Route
                    path="/updatestatususer/:id"
                    component={UpdateStatusUser}
                  />
                  <Route path="/tambahkomen/:id" component={TambahKomen} />
                  <Route path="/detailpinjam/:id" component={DetailPinjam} />
                  <Route path="/tambahartikel" component={TambahBuku} />
                  <Route path="/updatebuku/:id" component={Updatebuku} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/updaterole/:id" component={UpdateRole} />
                  <Route component={Notfound} />
                </Switch>
              </>
            );
          } else if (admin === "no") {
            return (
              <>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/tambahartikel" component={TambahArtikel} />
                  <Route path="/tambahkomen/:id" component={TambahKomen} />
                  <Route path="/viewartikel/:id" component={ViewArtikel} />
                  <Route path="/listartikelid" component={ListArtikel} />
                  <Route path="/allartikel" component={HomeGuess} />
                  <Route path="/listpinjamid" component={ListPinjamPerID} />
                  <Route path="/pinjambuku/:id_buku" component={PinjamBuku} />
                  <Route path="/logout" component={Logout} />
                  <Route component={Notfound} />
                </Switch>
              </>
            );
          } else {
            return (
              <>
                <Switch>
                  <Route exact path="/" component={HomeGuess} />
                  <Route path="/login" component={Login} />
                  <Route path="/viewartikel/:id" component={ViewArtikel} />
                  <Route path="/registeruser" component={RegisterUser} />
                  <Route component={Notfound} />
                </Switch>
              </>
            );
          }
        })()}
      </Main>
    </Switch>
  </Router>
);
// ReactDOM.render(<App />, document.getElementById("root"));

ReactDOM.render(routing, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
