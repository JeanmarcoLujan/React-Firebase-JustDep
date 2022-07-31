import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db } from "../firebaseConfig/firebase";

const Show = () => {
  const [reservations, setReservations] = useState([]);
  const reservationsColletion = collection(db, "reservations");

  const getReservations = async () => {
    const data1 = await getDocs(reservationsColletion);

    setReservations(data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteReservation = async (id) => {
    const dDoc = doc(db, "reservations", id);
    await deleteDoc(dDoc);
    getReservations();
  };

  useEffect(() => {
    getReservations();
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-primary mt-2 mb-2">
                Nuevo
              </Link>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Día</th>
                  <th>Usuario</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.camp}</td>
                    <td>{reservation.dayMatch}</td>
                    <td>{reservation.user}</td>
                    <td>{reservation.status}</td>
                    <td>
                      <Link
                        to={`/edit/${reservation.id}`}
                        className="btn btn-primary btn-sm mt-2 mb-2"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => deleteReservation(reservation.id)}
                        className="btn btn-danger btn-sm m-1"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
