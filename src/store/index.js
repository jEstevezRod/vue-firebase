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
    SET_USER_DATA: (state, user) => {
      if (typeof user == "object" && Object.keys(user).length > 0) {
        state.user = {
          uid: user.uid,
          name: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
          photoUrl: user.photoUrl,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      } else {
        state.user = null
      }
    },
    SET_LOG_IN: (state, loginStatus) => (state.LOGGED_IN = loginStatus),
    UPDATE_USER: (state, payload) =>
      (state.user = { ...state.user, ...payload }),
  },
  actions: {
    register: ({ commit }, payload) => {
      return new Promise((resolve) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then(({ user }) => {
            commit("SET_USER_DATA", user);
            resolve();
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
      return new Promise((resolve) => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            commit("SET_LOG_IN", false);
            commit("SET_USER_DATA", {});
            resolve();
          });
      });
    },
    isLoggedIn: async ({ commit }) => {
      try {
        await new Promise((resolve, reject) =>
          firebase.auth().onAuthStateChanged(
            (user) => {
              if (user) {
                commit("SET_LOG_IN", true);
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
    getUserData: ({ commit }, uid) => {
      return new Promise(() => {
        firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .onSnapshot((doc) => {
            console.log("User synchronized");
            commit("SET_USER_DATA", doc.data());
          });
      });
    },
    updateUser: ({ commit }, userData) => {
      return new Promise((resolve, reject) => {
        let userRef = firebase
          .firestore()
          .collection("users")
          .doc(userData.uid);
        delete userData.uid;
        userRef
          .update(userData)
          .then(() => {
            commit("UPDATE_USER", userData);
            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject();
          });
      });
    },
  },
  modules: {},
});
