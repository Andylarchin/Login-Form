import React, { useState, useEffect } from "react";
import "./Login_Body.css";
import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "../../firebase-config";

const Login_Body = () => {
  const ref = collection(database, "users");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [password, setPassword] = useState(0);
  const [username, setUsername] = useState(0);
  const [addValue, setAddValue] = useState(0);
  const [fire, setFire] = useState([]);

  useEffect(() => {
    setUsername(watch().username);
    setPassword(watch().password);
  }, [watch()]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(ref);
      setFire(data.docs.map((data) => ({ ...data.data(), id: data.id })));
    };
    getUsers();

    console.log(fire);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(ref);
      setFire(data.docs.map((data) => ({ ...data.data(), id: data.id })));
    };
    getUsers();
  }, [addValue]);

  return (
    <div className="container" style={{ height: "100vh", width: "1536px" }}>
      <div className="Image_Body">
        <section className="copy"></section>
      </div>
      <div className="Login_Body">
        <form
          onSubmit={handleSubmit((data) => {
            addDoc(ref, {
              username: data.username,
              password: data.password,
            });
          })}
        >
          <section className="copy">
            <h2>Log in</h2>
          </section>
          <div className="input-container username">
            <label htmlFor="username">Username</label>
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
            <label htmlFor="password">Password</label>
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
              setAddValue(addValue + 1);
              document.getElementById("usernameInput").value = "";
              document.getElementById("passwordInput").value = "";
            }}
          >
            Register
          </button>
          <br />
          <button
            className="signIn_button"
            type="button"
            onClick={() => {
              fire.map((data) => {
                if (data.username === username && data.password === password) {
                  alert("You entered");
                } else {
                  console.log("nope");
                }
              });
            }}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login_Body;
