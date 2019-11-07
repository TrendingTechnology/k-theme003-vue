import jwt from '../../service/http/requests/auth/jwt';

import firebase from 'firebase/app';
import 'firebase/auth';
import router from '@/router';

export default {
  loginAttempt({ dispatch }, payload) {
    const newPayload = {
      userDetails: payload.userDetails,
      notify: payload.notify,
      closeAnimation: payload.closeAnimation
    };

    if (!payload.checkbox_remember_me) {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)

        .then(function() {
          dispatch('login', newPayload);
        })

        .catch(function(err) {
          if (payload.closeAnimation) payload.closeAnimation();

          payload.notify({
            time: 2500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        });
    } else {
      dispatch('login', newPayload);
    }
  },
  login({ commit, state, dispatch }, payload) {
    if (state.isUserLoggedIn()) {
      if (payload.closeAnimation) payload.closeAnimation();

      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });

      return false;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(
        payload.userDetails.email,
        payload.userDetails.password
      )

      .then(
        result => {
          let isUsernameUpdateRequired = false;

          if (payload.updateUsername && payload.userDetails.username) {
            isUsernameUpdateRequired = true;

            dispatch('updateUsername', {
              user: result.user,
              username: payload.userDetails.username,
              notify: payload.notify,
              isReloadRequired: true
            });
          }

          if (payload.closeAnimation) payload.closeAnimation();

          if (!isUsernameUpdateRequired) {
            router.push(router.currentRoute.query.to || '/');
            commit('UPDATE_USER_INFO', result.user.providerData[0], {
              root: true
            });
          }
        },
        err => {
          if (payload.closeAnimation) payload.closeAnimation();

          payload.notify({
            time: 2500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        }
      );
  },

  loginWithGoogle({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false;
    }
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_USER_INFO', result.user.providerData[0], { root: true });
      })
      .catch(err => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },

  loginWithFacebook({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false;
    }
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_USER_INFO', result.user.providerData[0], { root: true });
      })
      .catch(err => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },

  loginWithTwitter({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false;
    }
    const provider = new firebase.auth.TwitterAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_USER_INFO', result.user.providerData[0], { root: true });
      })
      .catch(err => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },

  loginWithGithub({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false;
    }
    const provider = new firebase.auth.GithubAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_USER_INFO', result.user.providerData[0], { root: true });
      })
      .catch(err => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },
  registerUser({ dispatch }, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        payload.userDetails.email,
        payload.userDetails.password
      )
      .then(
        () => {
          payload.notify({
            title: 'Account Created',
            text: 'You are successfully registered!',
            iconPack: 'feather',
            icon: 'icon-check',
            color: 'success'
          });

          const newPayload = {
            userDetails: payload.userDetails,
            notify: payload.notify,
            updateUsername: true
          };
          dispatch('login', newPayload);
        },
        error => {
          payload.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          });
        }
      );
  },
  updateUsername({ commit }, payload) {
    payload.user
      .updateProfile({
        displayName: payload.username
      })
      .then(() => {
        let newUserData = Object.assign({}, payload.user.providerData[0]);
        newUserData.displayName = payload.username;
        commit('UPDATE_USER_INFO', newUserData, { root: true });

        if (payload.isReloadRequired) {
          router.push(router.currentRoute.query.to || '/');
        }
      })
      .catch(err => {
        payload.notify({
          time: 8800,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
  },

  loginJWT({ commit }, payload) {
    return new Promise((resolve, reject) => {
      jwt
        .login(payload.userDetails.email, payload.userDetails.password)
        .then(response => {
          if (response.data.userData) {
            router.push(router.currentRoute.query.to || '/');

            localStorage.setItem('accessToken', response.data.accessToken);

            commit('UPDATE_USER_INFO', response.data.userData, { root: true });

            commit('SET_BEARER', response.data.accessToken);

            resolve(response);
          } else {
            reject({ message: 'Wrong Email or Password' });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  registerUserJWT({ commit }, payload) {
    const {
      displayName,
      email,
      password,
      confirmPassword
    } = payload.userDetails;

    return new Promise((resolve, reject) => {
      if (password !== confirmPassword) {
        reject({ message: "Password doesn't match. Please try again." });
      }

      jwt
        .registerUser(displayName, email, password)
        .then(response => {
          router.push(router.currentRoute.query.to || '/');

          localStorage.setItem('accessToken', response.data.accessToken);
          commit('UPDATE_USER_INFO', response.data.userData, { root: true });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchAccessToken() {
    return new Promise(resolve => {
      jwt.refreshToken().then(response => {
        resolve(response);
      });
    });
  }
};
