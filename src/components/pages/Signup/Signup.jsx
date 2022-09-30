import React, { useState } from "react";
import { Link } from "react-router-dom";
import ramji from "../../../assets/ramji.jpg";
import "./Signup.css";

const Signup = () => {
  const [page, setPage] = useState(false);

  const [regStatus, setRegStatus] = useState(false);

  const changePage = () => {
    setPage(!page);
  };

  var message; // message to display

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    username: "",
    jsrsId: "",
    gender: "",
    age: "",
    email: "",
    profession: "",
    phone: "",
    address: "",
    password: "",
  });

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const postData = async (event) => {
    event.preventDefault();

    const {
      name,
      lastname,
      username,
      jsrsId,
      gender,
      age,
      email,
      profession,
      phone,
      address,
      password,
    } = formData;

    const res = await fetch("https://jsrs.azurewebsites.net/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        lastname,
        username,
        jsrsId,
        gender,
        age,
        email,
        profession,
        phone,
        address,
        password,
      }),
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      // window.alert(data);
      console.log("Invalid registration");
      message = "There was an error registering your account" + data.error;
      setRegStatus(true);
    } else {
      // window.alert(data);
      console.log("Registration successfully registered", data);

      if (data.id) {
        setRegStatus(true);
        message = "You have successfully registered";
      } else if (data.error) {
        message = "There was an error registering your account" + data.error;
        setRegStatus(true);
      } else if (data.err) {
        message = "There was an err registering your account" + data.err;
        setRegStatus(true);
      }
    }
  };

  return (
    <div className="container">
      <div className="box">
        <div className="img-container">
          <img className="img" src={ramji} alt="" />
        </div>
        <div className="form-section">
          <h2 className="title">Create an account</h2>
          {regStatus && <h2 className="title">{message}</h2>}
          <form className={page ? "form invisible" : "form"}>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Name"
              name="name"
            />
            <input
              type="text"
              onChange={handleChange}
              placeholder="Lastname"
              name="lastname"
            />
            <input
              type="text"
              onChange={handleChange}
              placeholder="Username"
              name="username"
            />
            <input
              type="text"
              onChange={handleChange}
              placeholder="Ramdoot ID"
              name="jsrsId"
            />
            <fieldset>
              <legend>Gender</legend>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
              <br />

              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
              <br />

              <br />
            </fieldset>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Age"
              name="age"
            />
          </form>
          <form className={page && !regStatus ? "form" : "form invisible"}>
            <input
              onChange={handleChange}
              type="email"
              placeholder="Email"
              name="email"
            />
            <label htmlFor="profession">Select your profession</label>
            <select
              id="profession"
              value={formData.profession}
              onChange={handleChange}
              name="profession"
            >
              <option value="">_SELECT_Profession</option>
              <option value="student">Student</option>
              <option value="pvt-job">Private Job</option>
              <option value="govt-job">Govt Job</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Phone"
              name="phone"
            />
            <input
              onChange={handleChange}
              type="text"
              placeholder="Address"
              name="address"
            />
            <input
              onChange={handleChange}
              type="password"
              placeholder="Password"
              name="password"
            />
          </form>
          <button
            className={regStatus ? "next invisible" : "next"}
            onClick={changePage}
          >
            {page ? "Prev" : "Next"}
          </button>
          <button
            className={page && !regStatus ? "next" : "next invisible"}
            onClick={postData}
          >
            SUBMIT
          </button>
          <Link to="/signin">
            <button className={regStatus ? "next" : "next invisible"}>
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
