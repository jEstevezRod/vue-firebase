import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
// const jwt_decode = require('jwt-decode')

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    LOGGED_IN: null,
    user: null,
  },
  mutations: {
    SET_USER_DATA: (state, user) => (state.user = user),
    SET_LOG_IN: (state, loginStatus) => (state.LOGGED_IN = loginStatus),
  },
  actions: {
    register: ({ commit }, payload) => {
      return new Promise((resolve) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((data) => {
            data.user
              .updateProfile({
                displayName: payload.name,
              })
              .then((res) => {
                commit("SET_USER_DATA", res);
                resolve();
              });
          })
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
          });
      });
    },

    login: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password)
          .then(() => {
            firebase
              .auth()
              .currentUser.getIdToken(false)
              .then(() => {
                commit("SET_LOG_IN", true);
                commit("SET_USER_DATA", firebase.auth().currentUser);
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((err) => reject(err));
      });
    },
    logout: ({ commit }) => {
      return new Promise((resolve, reject) => {
        firebase
          .auth()
          .signOut()
          .then((data) => {
            console.log("success in logout");
            console.log(data);
            commit("SET_LOG_IN", false);
            commit("SET_USER_DATA", null);
            resolve();
          })
          .catch(function(error) {
            console.error(error);
            reject();
          });
      });
    },
    isLoggedIn: async  ({ commit }) => {
      try {
        await new Promise((resolve, reject) =>
          firebase.auth().onAuthStateChanged(
            (user) => {
              if (user) {
                commit("SET_USER_DATA", user);
                resolve();
              } else {
                reject();
              }
            },
            (error) => reject(error)
          )
        );
        return true;
      } catch (error) {
        return false;
      }
    },
  },
  modules: {},
});
