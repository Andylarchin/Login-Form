import React, { useState, useEffect } from "react";
import "./Login_Body.css";
import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "../../firebase-config";

const Login_Body = () => {
  // Reference to the firebase database
  const ref = collection(database, "users");

  // Import all necessary tools from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // All the useStates 
  const [password, setPassword] = useState(0);
  const [username, setUsername] = useState(0);
  const [addValue, setAddValue] = useState(0);
  const [fire, setFire] = useState([]);

  // Change the password and username as soon as I type something in the input
  useEffect(() => {
    setUsername(watch().username);
    setPassword(watch().password);
  }, [watch()]);

  // Fetch and get data as soon as the app loads
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(ref);
      setFire(data.docs.map((data) => ({ ...data.data(), id: data.id })));
    };
    getUsers();

    console.log(fire);
  }, []);


// Update the users value as I hit the register button 
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
        // Add data to firebase docs on submit 
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
              // Basically just make the data update and delete the input old value 
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
            // Loop though the users data and check if the current input matches the data on the firebase database 
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
