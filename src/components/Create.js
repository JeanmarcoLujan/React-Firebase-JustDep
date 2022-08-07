import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';

const Create = () => {
  const [camp, setCamp] = useState("");
  const [dayMatch, setDayMatch] = useState("");
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const reservationColle = collection(db, "reservations");

  const handleChange = (event) => {
    setCamp(event.target.value);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeDate = (newValue) => {
    setDayMatch(newValue);
  };

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
              <label className="form-label">Campo</label><br></br>

              <FormControl fullWidth sx={{ m: 1, minWidth: 500 }} size="small">
                <InputLabel id="demo-select-small">Campo</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={camp}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Campo 1</MenuItem>
                  <MenuItem value={2}>Campo 2</MenuItem>
                  <MenuItem value={3}>Campo 3</MenuItem>
                  <MenuItem value={4}>Campo 4</MenuItem>
                  <MenuItem value={5}>Campo 5</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="mb-3">
              <label className="form-label">Dia</label>

              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/dd/yyyy"
                value={dayMatch}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
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

              <FormControl fullWidth sx={{ m: 1, minWidth: 500 }} size="small">
                <InputLabel id="demo-select-small">Estado</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={status}
                  label="Age"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Libre</MenuItem>
                  <MenuItem value={2}>Reservado</MenuItem>
                  <MenuItem value={3}>Jugando</MenuItem>
                  <MenuItem value={4}>Cancelado</MenuItem>
                </Select>
              </FormControl>



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
