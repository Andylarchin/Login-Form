import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import LuigiClient from '@luigi-project/client';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import detectBrowserLanguage from 'detect-browser-language';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { database } from '../../firebase-config';
import { OldUserContext } from '../oldUserContext/oldUserContext';

const loginBody = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const refer = collection(database, 'users');

  const { setOldData } = useContext(OldUserContext);

  // Import all necessary tools from react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // All the useStates and variables
  const [password, setPassword] = useState(0);
  const [username, setUsername] = useState(0);
  const [addValue, setAddValue] = useState(0);
  const [fire, setFire] = useState([]);
  const user = fire.filter((users) => users.username === username);
  const urpassword = fire.filter((users) => users.password === password);
  const userId = user.map((users) => users.id)[0];
  const usernameRegister = register('username');
  const passwordRegister = register('password');

  // Change the password and username as soon as I type something in the input
  useEffect(() => {
    LuigiClient.setTargetOrigin('http://localhost:3000');
  }, []);

  useEffect(() => {
    setUsername(watch().username);
    setPassword(watch().password);
    LuigiClient.sendCustomMessage({
      id: 'localmessage',
      message: { someUserData: 'im some data' },
    });
    LuigiClient.addCustomMessageListener('aye', (data) => console.log(data));
  }, [watch()]);
  // Fetch and get data as soon as the app loads
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(refer);
      setFire(data.docs.map((datas) => ({ ...datas.data(), id: datas.id })));
    };
    getUsers();
    i18n.changeLanguage(detectBrowserLanguage());
  }, []);

  // Change users name and password
  const updateUser = async (id, oldPassword, oldUsername) => {
    setOldData([id, oldPassword, oldUsername]);
  };

  // Update the users value as I hit the register button
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(refer);
      setFire(data.docs.map((datas) => ({ ...datas.data(), id: datas.id })));
    };
    getUsers();
  }, [addValue]);

  const resetField = () => {
    document.getElementById('usernameInput').value = '';
    document.getElementById('passwordInput').value = '';
  };

  const updateFunc = () => {
    if (user.length > 0 && urpassword.length > 0) {
      updateUser(userId, password, username);
      navigate('/reset');
    } else {
      Swal.fire(`${t('errpop')}`, `${t('subwarning')}`, 'error').then((result) => {
        if (result.isConfirmed) {
          resetField();
        }
      });
    }
  };

  const loginFunc = () => {
    Swal.fire(`${t('gudpop')}`, `${t('subgud')}`, 'success').then((result) => {
      if (result.isConfirmed) {
        resetField();
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen" id="container">
      <div
        className=" h-[200px] bg-cover items-center justify-center bg-[url('../xbg_1.jpg.pagespeed.ic.R5QWIA8_nZ.jfif')]"
        id="picture"
      >
        <section className="text-center" />
      </div>
      <div className="flex items-center justify-center " id="login">
        <form
          className=""
          // Add data to firebase docs on submit
          onSubmit={handleSubmit((data) => {
            addDoc(refer, {
              username: data.username,
              password: data.password,
            });
          })}
        >
          <section className="text-center">
            <h2 className="text-2xl font-bold m-[1.5em]">{t('login')}</h2>
          </section>
          <div className="input-container username">
            <label htmlFor="username" className="block mb-2 text-xs">
              {t('username')}
            </label>
            <input
              className="block w-full box-border rounded-lg mb-5 text-sm p-[1em] border-[1px] border-gray-400 w-[300px] h-[42.8px]"
              id="usernameInput"
              onChange={usernameRegister.onChange}
              onBlur={usernameRegister.onBlur}
              name={usernameRegister.name}
              ref={usernameRegister.ref}
              type="text"
            />
            {errors.username && <p>{t('warning')}</p>}
          </div>
          <div className="input-container password">
            <label htmlFor="password" className="block mb-2 text-xs">
              {t('password')}
            </label>
            <input
              className="block w-full box-border rounded-lg mb-5 text-sm p-[1em] border-[1px] border-gray-400 h-[46.8px]"
              id="passwordInput"
              onChange={passwordRegister.onChange}
              onBlur={passwordRegister.onBlur}
              name={passwordRegister.name}
              ref={passwordRegister.ref}
              type="password"
            />
            {errors.username && <p>{t('warning')}</p>}
          </div>
          <button
            className="block w-full bg-gray-800 text-white font-bold p-4 rounded-lg text-xs uppercase tracking-[0,5px]"
            type="submit"
            onClick={() => {
              // Basically just make the data update and delete the input old value
              setAddValue(addValue + 1);
              resetField();
            }}
          >
            {t('register')}
          </button>
          <br />
          <button
            className="block w-full bg-gray-800 text-white font-bold p-4 rounded-lg text-xs uppercase tracking-[0,5px]"
            type="button"
            onClick={() => {
              fire.map((data) => {
                if (data.username === username && data.password === password) {
                  loginFunc();
                } else if (data.username !== username && data.password !== password) {
                  Swal.fire(`${t('errpop')}`, `${t('subwarning')}`, 'error');
                }
                return true;
              });
            }}
          >
            {t('lgin')}
          </button>
          <br />
          <button
            className="block w-full bg-gray-800 text-white font-bold p-4 rounded-lg text-xs uppercase tracking-[0,5px]"
            type="button"
            onClick={() => {
              updateFunc();
            }}
          >
            {t('update')}
          </button>

          <br />
          <button
            className="block w-full bg-gray-800 text-white font-bold p-4 rounded-lg text-xs uppercase tracking-[0,5px]"
            type="button"
            onClick={() => {
              LuigiClient.linkManager().navigate('/home/empty');
            }}
          >
            Play TicTacToe!
          </button>
        </form>
      </div>
    </div>
  );
};

export default loginBody;
