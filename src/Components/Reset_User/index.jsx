/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
import React, {
  useState, useContext, useEffect, useReducer,
} from 'react';
import '/src/index.css';
import { useForm } from 'react-hook-form';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import detectBrowserLanguage from 'detect-browser-language';
import { database } from '../../firebase-config';
// eslint-disable-next-line import/named
import { OldUserContext } from '../oldUserContext/oldUserContext';

const resetUser = () => {
  const { t, i18n } = useTranslation();
  const reducer = (state, action) => {
    switch (action.type) {
      case 'username':
        return { ...state, username: action.payload };
      case 'password':
        return { ...state, password: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, { username: '', password: '' });
  const [update, setUpdate] = useState(false);
  const { oldData } = useContext(OldUserContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const usernameRegister = register('username');

  useEffect(() => {
    if (update === true) {
      const updateUser = async () => {
        const newfield = { username: state.username, password: state.password };
        const userDoc = doc(database, 'users', oldData[0]);
        await updateDoc(userDoc, newfield);
      };

      i18n.changeLanguage(detectBrowserLanguage());

      updateUser();
      Swal.fire(`${t('gudpop')}`, `${t('subgud')}`, 'success').then((result) => {
        if (result.isConfirmed) {
          navigate('/');
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
        <section className="text-center" />
      </div>
      <div className="flex items-center justify-center " id="login">
        <form
          id="form"
          onSubmit={handleSubmit((data) => {
            dispatch({ type: 'username', payload: data.username });
            dispatch({ type: 'password', payload: data.password });
            setUpdate(true);
          })}
        >
          <section className="text-center">
            <h2 className="text-2xl font-bold m-[1.5em]">{t('register')}</h2>
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
              className="block w-full box-border rounded-lg mb-5 text-sm p-[1em] border-[1px] border-gray-400 w-[300px] h-[42.8px]"
              id="passwordInput"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('password', { required: true })}
              type="password"
            />
            {errors.username && <p>{t('warning')}</p>}
          </div>
          <button
            className="block w-full bg-gray-800 text-white font-bold p-4 rounded-lg text-xs uppercase tracking-[0,5px]"
            type="submit"
          >
            {t('update')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default resetUser;
