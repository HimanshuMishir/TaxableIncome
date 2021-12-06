import { useRef } from "react";
import Axios from "axios";
import "../styles/forms.css";
import { Link } from "react-router-dom";

function Forms() {
  const basInputRef = useRef();
  const ltaInputRef = useRef();
  const hraInputRef = useRef();
  const faInputRef = useRef();
  const invInputRef = useRef();
  const rentInputRef = useRef();
  const cityInputRef = useRef();
  const medInputRef = useRef();

  function submitHandler(event) {
    const enteredBas = basInputRef.current.value;
    const enteredLta = ltaInputRef.current.value;
    const enteredHra = hraInputRef.current.value;
    const enteredFa = faInputRef.current.value;
    const enteredInv = invInputRef.current.value;
    const enteredRent = rentInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredMed = medInputRef.current.value;

    Axios.post(
      "http://localhost:3001/details",
      {
        bas: parseInt(enteredBas),
        lta: parseInt(enteredLta),
        hra: parseInt(enteredHra),
        fa: parseInt(enteredFa),
        inv: parseInt(enteredInv),
        rent: parseInt(enteredRent),
        city: enteredCity,
        med: parseInt(enteredMed),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="forms1">
        <h1>Please enter the following details... </h1>

        <label>Please Enter Bas </label>
        <input type="text" required ref={basInputRef} />
        <label>Please Enter LTA </label>
        <input type="text" required ref={ltaInputRef} />
        <label>Please Enter HRA </label>
        <input type="text" required ref={hraInputRef} />
        <label>Please Enter FA </label>
        <input type="text" required ref={faInputRef} />
      </div>
      <div className="forms2">
        <h3> Please also enter these follwing details</h3>
        <label>Please Enter Inv </label>
        <input type="text" required ref={invInputRef} />
        <label>Please Enter Rent </label>
        <input type="text" required ref={rentInputRef} />
        <label>Please Enter City(Metro/Non Metro) </label>
        <input type="text" required ref={cityInputRef} />
        <label>Please Enter Med</label>
        <input type="text" required ref={medInputRef} />
        <Link to="/dashboard">
          <button onClick={submitHandler}>SUBMIT </button>
        </Link>
      </div>
    </>
  );
}

export default Forms;
