import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Create = () => {
  const [camp, setCamp] = useState("");
  const [dayMatch, setDayMatch] = useState("");
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const reservationColle = collection(db, "reservations");

  const store = async (e) => {
    e.preventDefault();
    await addDoc(reservationColle, {
      camp: camp,
      dayMatch: dayMatch,
      user: user,
      status: status
    });
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3>Create reservation</h3>
          <form onSubmit={store}>
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
              Guardar reserva
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
