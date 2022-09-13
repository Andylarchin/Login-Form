import React, { useState,useEffect, useRef } from "react";
import "./Login_Body.css";
import FC from "react";
import { useForm } from "react-hook-form";

const Login_Body = () => {
  // type ConstVaues = {
  //   username: any;
  //   password: any;
  // };

  const ref = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const [user, setUser] = useState(0);
  const [password,setPassword] = useState(0);
  const [username,setUsername] = useState(0);
  const [added,setAdded] = useState(false);
  const [addValue,setAddValue] = useState(false);

  useEffect(() => {
    setUsername(watch().username);
    setPassword(watch().password);
  },[watch()]);

  useEffect(() => {
      alert('Please register your user');
  }, []);


  return (
    <div className="container" style={{ height: "100vh", width: "1536px" }}>
      <div className="Image_Body">
        <section className="copy"></section>
      </div>
      <div className="Login_Body">
        <form
          onSubmit={handleSubmit((data) => {
            if(added === false) {
              setUser({...data});
              setAdded(true);
              console.log(data,added);
            }
          })}
        >
          <section className="copy">
            <h2>Log in</h2>
          </section>
          <div className="input-container username">
            <label htmlFor="username">Username</label>
            <input
              className="username_input"
              ref = {ref}
              id = 'usernameInput'
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
              id = 'passwordInput'
              {...register("password", { required : true})}
              type="password"
            ></input>
            {errors.username && <p>This field is required</p>}
          </div>
          <button
            className="signIn_button"
            type="submit"
            onClick={() => {
               setAddValue(true);
               document.getElementById('usernameInput').value = '';
               document.getElementById('passwordInput').value = '';
            }}
          >
            Register
          </button>
          <br />
          <button
            className="signIn_button"
            type="submit"
            onClick={() => {
              console.log(user,username,password);
              if (
                username === user.username &&
                password === user.password
              ) {
                alert("You have successfully logged in");
              } else {
                alert("Inccorect input");
              }
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
