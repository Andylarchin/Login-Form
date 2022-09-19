import React, { useState, useContext, useEffect } from "react";
import "./Reset_User.css";
import { useForm } from "react-hook-form";
import { updateDoc, doc } from "firebase/firestore";
import { database } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { OldUserContext } from "../oldUserContext/oldUserContext";

const Reset_User = () => {
  // Reference to the firebase database
  const [newUsername, setNewUsername] = useState(0);
  const [newPassword, setNewPassword] = useState(0);
  const [update, setUpdate] = useState(0);
  const { oldData } = useContext(OldUserContext);

  const navigate = useNavigate();

  console.log(oldData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const updateUser = async () => {
      setUpdate(update + 1);
      const newfield = { username: newUsername, password: newPassword };
      const userDoc = doc(database, "users", oldData[0]);
      await updateDoc(userDoc, newfield);
    };

    updateUser();
    navigate("/");
  }, [newPassword]);

  return (
    <div className="container" style={{ height: "100vh", width: "1536px" }}>
      <div className="Image_Body">
        <section className="copy"></section>
      </div>
      <div className="Login_Body">
        <form
          id="form"
          // Add data to firebase docs on submit
          onSubmit={handleSubmit((data) => {
            setNewPassword(data.password);
            setNewUsername(data.username);
          })}
        >
          <section className="copy">
            <h2>New Register</h2>
          </section>
          <div className="input-container username">
            <label htmlFor="username">New Username</label>
            <input
              className="username_input"
              id="usernameInput"
              {...register("username", {
                required: true,
              })}
              type="text"
            ></input>
            {errors.username && <p>This field is required</p>}
          </div>
          <div className="input-container password">
            <label htmlFor="password">New Password</label>
            <input
              className="password_input"
              id="passwordInput"
              {...register("password", { required: true })}
              type="password"
            ></input>
            {errors.username && <p>This field is required</p>}
          </div>
          <button className="signIn_button" type="submit" onClick={() => {}}>
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset_User;
