import Vue from "vue";
import { firebaseAuth, firebaseDb } from "boot/firebase";
import { Notify } from "quasar";

const state = {
  authUser: {},
  users: {}
};

const getters = {
  users: state => {
    let filteredUsers = {};
    Object.keys(state.users).forEach(key => {
      if (key !== state.authUser.uid) {
        filteredUsers[key] = state.users[key];
      }
    });
    return filteredUsers;
  }
};

const actions = {
  addUser({ commit }, user) {
    firebaseAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(response => {
        let uid = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + uid).set({
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password,
          online: true
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  },

  loginUser({}, user) {
    firebaseAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        if (error.code === "auth/wrong-password") {
          Notify.create({
            type: "negative",
            message: "Wrong password!"
          });
        } else {
          Notify.create({
            type: "negative",
            message: error.message
          });
        }
      });
  },

  logoutUser({}) {
    firebaseAuth.signOut();
  },

  handleAuthStateChanged({ commit, dispatch, state }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        // User is logged in
        let uid = firebaseAuth.currentUser.uid;
        firebaseDb.ref("users/" + uid).once("value", snapshot => {
          let userDetails = snapshot.val();
          commit("setAuthUser", {
            name: userDetails.name,
            email: userDetails.email,
            uid: uid
          });
        });
        dispatch("firebaseUpdateUser", {
          uid: uid,
          updates: {
            online: true
          }
        });
        dispatch("firebaseGetUsers");
        this.$router.push("/");
      } else {
        // User is logged out
        if (state.authUser.uid) {
          dispatch("firebaseUpdateUser", {
            uid: state.authUser.uid,
            updates: {
              online: false
            }
          });
        }
        commit("setAuthUser", {});
        this.$router.replace("/auth");
      }
    });
  },

  firebaseGetUsers({ commit }) {
    firebaseDb.ref("users").on("child_added", snapshot => {
      let uid = snapshot.key;
      let userDetails = snapshot.val();
      commit("setUsers", {
        uid: uid,
        userDetails: userDetails
      });
    });
    firebaseDb.ref("users").on("child_changed", snapshot => {
      let uid = snapshot.key;
      let userDetails = snapshot.val();
      commit("updateUser", {
        uid: uid,
        userDetails: userDetails
      });
    });
  },

  firebaseUpdateUser({}, payload) {
    firebaseDb.ref("users/" + payload.uid).update(payload.updates);
  }
};

const mutations = {
  setAuthUser(state, payloads) {
    state.authUser = payloads;
  },

  setUsers(state, payload) {
    Vue.set(state.users, payload.uid, payload.userDetails);
  },

  updateUser(state, payload) {
    Object.assign(state.users[payload.uid], payload.userDetails);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
