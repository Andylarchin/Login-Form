import React, { useState, useContext, useEffect } from "react";
import "./Reset_User.css";
import { useForm } from "react-hook-form";
import { updateDoc, doc } from "firebase/firestore";
import { database } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { OldUserContext } from "../oldUserContext/oldUserContext";
import Swal from "sweetalert2";

const Reset_User = () => {
  const [newUsername, setNewUsername] = useState(0);
  const [newPassword, setNewPassword] = useState(0);
  const [update, setUpdate] = useState(false);
  const { oldData } = useContext(OldUserContext);

  const navigate = useNavigate();

  console.log(oldData, newUsername, newPassword);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (update === true) {
      const updateUser = async () => {
        const newfield = { username: newUsername, password: newPassword };
        const userDoc = doc(database, "users", oldData[0]);
        await updateDoc(userDoc, newfield);
      };

      updateUser();
      Swal.fire("Greatjob", "You have changed your user data", "success").then(
        (result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        }
      );
    }
  }, [update]);

  return (
    <div className="container" style={{ height: "100vh", width: "1536px" }}>
      <div className="Image_Body">
        <section className="copy"></section>
      </div>
      <div className="Login_Body">
        <form
          id="form"
          onSubmit={handleSubmit((data) => {
            setNewPassword(data.password);
            setNewUsername(data.username);
            setUpdate(true);
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
          <button
            className="signIn_button"
            type="submit"
            onClick={() => {
              
            }}
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset_User;
