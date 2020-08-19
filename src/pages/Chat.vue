<template>
  <q-page ref="pageChat" class="flex column">
    <q-banner
      v-if="!otherUserDetails.online"
      class="bg-grey-4 text-center fixed-top"
      dense
    >
      {{ otherUserDetails.name }} is offline.
    </q-banner>
    <div
      :class="{ invisible: !showMessages }"
      class="q-pa-md column col justify-end"
    >
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? 'me' : otherUserDetails.name"
        avatar="https://cdn.quasar.dev/img/avatar4.jpg"
        :text="[message.text]"
        :sent="message.from == 'me'"
        stamp="7 minutes ago"
        :text-color="message.from == 'me' ? 'white' : ''"
        :bg-color="message.from == 'me' ? 'blue-9' : 'grey-3'"
      />
    </div>
    <q-footer class="bg-grey-1 q-pa-sm" bordered>
      <q-form @submit="sendMessage">
        <q-input
          ref="inputMessage"
          outlined
          rounded
          dense
          v-model="newMessage"
          placeholder="Type a message..."
        >
          <template v-slot:before>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
            </q-avatar>
          </template>

          <template v-slot:after>
            <q-btn
              @click="sendMessage"
              :disable="!newMessage"
              :color="newMessage ? 'primary' : 'grey'"
              round
              dense
              flat
              icon="send"
            />
          </template>
        </q-input>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details.js";
export default {
  mixins: [mixinOtherUserDetails],

  watch: {
    messages: function(val) {
      if (Object.keys(val).length) {
        this.scrollToBottom();
        setTimeout(() => {
          this.showMessages = true;
        }, 200);
      }
    }
  },

  data() {
    return {
      showMessages: false,
      newMessage: ""
    };
  },

  computed: {
    ...mapState("user", ["authUser", "users"]),
    ...mapState("chat", ["messages"])
  },

  methods: {
    ...mapActions("chat", [
      "firebaseGetMessages",
      "firebaseStopGettingMessages",
      "firebaseSendMessage"
    ]),

    clearMessage() {
      this.newMessage = "";
      this.$refs.inputMessage.focus();
    },

    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight);
      }, 20);
    },

    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: "me"
        },
        authUserId: this.authUser.uid,
        otherUserId: this.$route.params.otherUserId
      });
      this.clearMessage();
    }
  },

  mounted() {
    this.firebaseGetMessages({
      authUserId: this.authUser.uid,
      otherUserId: this.$route.params.otherUserId
    });
  },

  destroyed() {
    this.firebaseStopGettingMessages();
  }
};
</script>

<style lang="stylus" scoped>
.q-banner
    top: 49px
    z-index: 1
</style>
