import React, { useState, useContext, useEffect, useReducer } from "react";
import "/src/index.css";
import { useForm } from "react-hook-form";
import { updateDoc, doc } from "firebase/firestore";
import { database } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { OldUserContext } from "../oldUserContext/oldUserContext";
import Swal from "sweetalert2";

const Reset_User = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "username":
        return { ...state, username: action.payload };
      case "password":
        return { ...state, password: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, { username: "", password: "" });
  const [update, setUpdate] = useState(false);
  const { oldData } = useContext(OldUserContext);

  const navigate = useNavigate();

  console.log(oldData, state.username, state.password);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (update === true) {
      const updateUser = async () => {
        const newfield = { username: state.username, password: state.password };
        const userDoc = doc(database, "users", oldData[0]);
        await updateDoc(userDoc, newfield);
      };

      updateUser();
      Swal.fire(
        "Great job!",
        "You have changed your user data",
        "success"
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  }, [update]);

  return (
    <div className="flex flex-col min-h-screen" id="container">
      <div
        className=" h-[200px] bg-cover items-center justify-center bg-[url('../xbg_1.jpg.pagespeed.ic.R5QWIA8_nZ.jfif')]"
        id="picture"
      >
        <section className="text-center"></section>
      </div>
      <div className="flex items-center justify-center " id="login">
        <form
          id="form"
          onSubmit={handleSubmit((data) => {
            // setNewPassword(data.password);
            // setNewUsername(data.username);
            dispatch({ type: "username", payload: data.username });
            dispatch({ type: "password", payload: data.password });
            setUpdate(true);
          })}
        >
          <section className="text-center">
            <h2 className="text-2xl font-bold m-[1.5em]">New Register</h2>
          </section>
          <div className="input-container username">
            <label htmlFor="username" className="block mb-2 text-xs">
              New Username
            </label>
            <input
              className="block w-full box-border rounded-lg mb-5 text-sm p-[1em] border-[1px] border-gray-400 w-[300px] h-[42.8px]"
              id="usernameInput"
              {...register("username", {
                required: true,
              })}
              type="text"
            ></input>
            {errors.username && <p>This field is required</p>}
          </div>
          <div className="input-container password">
            <label htmlFor="password" className="block mb-2 text-xs">
              New Password
            </label>
            <input
              className="block w-full box-border rounded-lg mb-5 text-sm p-[1em] border-[1px] border-gray-400 w-[300px] h-[42.8px]"
              id="passwordInput"
              {...register("password", { required: true })}
              type="password"
            ></input>
            {errors.username && <p>This field is required</p>}
          </div>
          <button
            className="block w-full bg-gray-800 text-white font-bold p-4 rounded-lg text-xs uppercase tracking-[0,5px]"
            type="submit"
            onClick={() => {}}
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reset_User;
