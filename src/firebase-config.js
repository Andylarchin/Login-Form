import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAgS-hatIyXfio4W_Pszi5uniS-wGzEb2o',
  authDomain: 'luigi-project-d7135.firebaseapp.com',
  projectId: 'luigi-project-d7135',
  storageBucket: 'luigi-project-d7135.appspot.com',
  messagingSenderId: '68917669228',
  appId: '1:68917669228:web:f8be58bccfb81799899749',
  measurementId: 'G-NKK5HQLVTV',
};

const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);

export default 'bar';
