import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Edit = () => {
  const [camp, setCamp] = useState("");
  const [dayMatch, setDayMatch] = useState("");
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const re = doc(db, "reservations", id);
    const data = {
      camp: camp,
      dayMatch: dayMatch,
      user: user,
      status: status
    };
    await updateDoc(re, data);
    navigate("/");
  };

  const getReservationById = async (id) => {
    const re = getDoc(doc(db, "reservations", id));
    if ((await re).exists()) {
      setCamp((await re).data().camp);
      setDayMatch((await re).data().dayMatch);
      setUser((await re).data().user);
      setStatus((await re).data().status);
      console.log("consultando...");
    } else {
      console.log("no existe registro");
    }
  };

  useEffect(() => {
    getReservationById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Editar reservation</h3>
          <form onSubmit={update}>
            <div className="mb-3">
              <label className="form-label">Campo</label>
              <input
                value={camp}
                onChange={(e) => setCamp(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dia</label>
              <input
                value={dayMatch}
                onChange={(e) => setDayMatch(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Actualizar reserva
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
