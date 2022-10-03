import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "../../firebase-config";
import { OldUserContext } from "../oldUserContext/oldUserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { data } from "autoprefixer";


const Login_Body = () => {
  const navigate = useNavigate();
  const ref = collection(database, "users");

  const { oldData, setOldData } = useContext(OldUserContext);

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

  // Change users name and password
  const updateUser = async (id, oldPassword, oldUsername) => {
    setOldData([id, oldPassword, oldUsername]);
    console.log(oldData);
  };

  // Update the users value as I hit the register button
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(ref);
      setFire(data.docs.map((data) => ({ ...data.data(), id: data.id })));
    };
    getUsers();
  }, [addValue]);

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
          className=""
          // Add data to firebase docs on submit
          onSubmit={handleSubmit((data) => {
            addDoc(ref, {
              username: data.username,
              password: data.password,
            });
          })}
        >
          <section className="text-center">
            <h2 className="text-2xl font-bold m-[1.5em]">Log in</h2>
          </section>
          <div className="input-container username">
            <label htmlFor="username" className="block mb-2 text-xs">
              Username
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
              Password
            </label>
            <input
              className="block w-full box-border rounded-lg mb-5 text-sm p-[1em] border-[1px] border-gray-400 h-[46.8px]"
              id="passwordInput"
              {...register("password", { required: true })}
              type="password"
            ></input>
            {errors.username && <p>This field is required</p>}
          </div>
          <button
            className="block w-full bg-gray-800 text-white font-bold p-4 rounded-lg text-xs uppercase tracking-[0,5px]"
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
            className="block w-full bg-gray-800 text-white font-bold p-4 rounded-lg text-xs uppercase tracking-[0,5px]"
            type="button"
            // Loop though the users data and check if the current input matches the data on the firebase database
            onClick={() => {
              let repeat = false;
              fire.map((data) => {
                if (data.username === username && data.password === password) {
                  Swal.fire(
                    "Great job!",
                    "You succesfully logged in your account",
                    "success"
                  ).then((result)=> {
                    if(result.isConfirmed) {
                      document.getElementById("usernameInput").value = "";
                      document.getElementById("passwordInput").value = "";
                    }
                    repeat = false;
                  });
                } else {
                  if(repeat === false) {
                     Swal.fire(
                      "Ooops...",
                      'Something went wrong!',
                      "error"
                     ).then((result) => {
                      if(result.isConfirmed) {
                        repeat = true;
                         document.getElementById("usernameInput").value = "";
                         document.getElementById("passwordInput").value = "";
                      }
                     })
                  }
                }
              });
            }}
          >
            Log in
          </button>
          <br />
          <button
            className="block w-full bg-gray-800 text-white font-bold p-4 rounded-lg text-xs uppercase tracking-[0,5px]"
            type="button"
            // Loop though the users data and check if the current input matches the data on the firebase database
            onClick={() => {
              let user = fire.filter((user) => user.username === username);
              let userId = user.map((user) => user.id)[0];
              if(user && data.password === password) {
              updateUser(userId, password, username);
              navigate("/reset");
              } else {
                 Swal.fire("Ooops...", "Something went wrong!", "error").then((result) => {
                  if(result.isConfirmed) {
                      document.getElementById("usernameInput").value = "";
                      document.getElementById("passwordInput").value = "";
                  }
                 });
              }
            }}
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login_Body;
