import Vue from "vue";
import { firebaseAuth, firebaseDb } from "boot/firebase";

//Global Variable
let messagesRef;

const state = {
  messages: {}
};

const getters = {};

const actions = {
  firebaseGetMessages({ commit }, payloads) {
    let authUserId = payloads.authUserId;
    let otherUserId = payloads.otherUserId;
    let messagesRef = firebaseDb.ref("chats/" + authUserId + "/" + otherUserId);
    messagesRef.on("child_added", snapshot => {
      let messageDetails = snapshot.val();
      let messageId = snapshot.key;
      commit("setMessages", {
        messageId,
        messageDetails
      });
    });
  },

  firebaseStopGettingMessages({ commit }) {
    if (messagesRef) {
      messagesRef.off("child_added");
    }
    commit("clearMessages");
  },

  firebaseSendMessage({}, payloads) {
    console.log(payloads.authUserId)
    firebaseDb
      .ref("chats/" + payloads.authUserId + "/" + payloads.otherUserId)
      .push(payloads.message);
    payloads.message.from = "them";
    firebaseDb
      .ref("chats/" + payloads.otherUserId + "/" + payloads.authUserId)
      .push(payloads.message);
  }
};

const mutations = {
  setMessages(state, payload) {
    Vue.set(state.messages, payload.messageId, payload.messageDetails);
  },

  clearMessages(state) {
    state.messages = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
