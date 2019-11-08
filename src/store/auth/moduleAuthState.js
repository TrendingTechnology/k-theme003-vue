import auth from '@/service/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  isUserLoggedIn: () => {
    let isAuthenticated = false;

    const firebaseCurrentUser = firebase.auth().currentUser;

    if (auth.isAuthenticated() || firebaseCurrentUser) isAuthenticated = true;
    else isAuthenticated = false;

    return localStorage.getItem('userInfo') && isAuthenticated;
  }
};
