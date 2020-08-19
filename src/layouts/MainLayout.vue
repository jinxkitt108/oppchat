<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          icon="arrow_back"
          dense
          flat
        />
        <q-toolbar-title class="absolute-center">
          {{title}}
        </q-toolbar-title>

        <q-btn
          v-if="authUser.uid"
          @click="dialog = true"
          flat
          round
          dense
          icon="more_vert"
          class="absolute-right"
        />
        <q-dialog v-model="dialog" position="bottom">
          <div class="column justify">
            <q-list class="bg-white text-center" separator bordered>
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label>Settings</q-item-label>
                </q-item-section>
              </q-item>
              <q-item @click="logoutUser" v-close-popup clickable v-ripple>
                <q-item-section>
                  <q-item-label>Log Out</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-close-popup clickable v-ripple>
                <q-item-section>
                  <q-item-label>Cancel</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-dialog>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details.js";
export default {
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState("user", ["authUser"]),

    // eslint-disable-next-line vue/return-in-computed-property
    title() {
      let path = this.$route.fullPath;
      if (path == "/") return "Contacts";
      else if (path.includes("/chat")) return this.otherUserDetails.name;
      else if (path == "/auth") return "Opp Chat";
    }
  },

  data() {
    return {
      dialog: false
    };
  },

  methods: {
    ...mapActions("user", ["logoutUser"])
  }
};
</script>
