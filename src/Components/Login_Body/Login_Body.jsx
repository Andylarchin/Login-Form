import React, { useState, useEffect } from "react";
import "./Login_Body.css";
import { useForm } from "react-hook-form";

const Login_Body = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState(0);
  const [username, setUsername] = useState(0);
  const [addValue, setAddValue] = useState(false);

  useEffect(() => {
    setUsername(watch().username);
    setPassword(watch().password);
  }, [watch()]);

  useEffect(() => {
    alert("Please register your user");
  }, []);

  return (
    <div className="container" style={{ height: "100vh", width: "1536px" }}>
      <div className="Image_Body">
        <section className="copy"></section>
      </div>
      <div className="Login_Body">
        <form
          onSubmit={handleSubmit((data) => {
            setUser([...user, data]);
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
              setAddValue(true);
              document.getElementById("usernameInput").value = "";
              document.getElementById("passwordInput").value = "";
            }}
          >
            Register
          </button>
          <br />
          <button
            className="signIn_button"
            type="submit"
            onClick={() => {
              console.log(user, username, password);
              // if (username === user.map(user => {
              //   if(user.username === username) {
              //     return user.username;
              //   }
              // }) && password === user.map(user => {
              //   if(user.password === password) {
              //     return user.password;
              //   }
              // })) {
              //   alert("You have successfully logged in");
              // } else {
              //   alert("Incorect input");
              // }
              user.map(data=> {
                if(data.username === username && data.password === password) {
                  alert('You entered')
                } else {
                  console.log('nope');
                }
              })
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
