import React from 'react'
import './Login_Body.css';
import FC from 'react';
import {useForm} from 'react-hook-form';

const Login_Body = () => {

  type ConstVaues = {
    username : any;
    password : any;
  }
 
  const {register,handleSubmit} = useForm<ConstVaues>();

  return (
    <div className="container" style={{ height: "100vh", width: "1536px" }}>
      <div className="Image_Body">
        <section className="copy">
        </section>
      </div>
      <div className="Login_Body">
        <form onSubmit = {handleSubmit((data) => {
          console.log(data);
        })}>
          <section className="copy">
            <h2>Log in</h2>
          </section>
          <div className="input-container username">
            <label htmlFor="username">Username</label>
            <input
              className="username_input"
              {...register("username")}
              type="text"
            ></input>
          </div>
          <div className="input-container password">
            <label htmlFor="password">Password</label>
            <input
              className="password_input"
              {...register("password")}
              type="password"
            ></input>
          </div>
          <button className="signIn_button" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login_Body;