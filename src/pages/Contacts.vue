<template>
  <q-page class="flex q-pa-md">
    <q-list class="full-width" separator>
      <q-item
        :to="'/chat/' + key"
        v-for="(contact, key) in users"
        :key="key"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ contact.name.charAt(0) }}
            <q-badge
              :color="contact.online ? 'green' : 'grey-4'"
              class="online-badge"
            >
            </q-badge>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["users"])
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.online-badge {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: 2px solid #fff;
  position: absolute;
  left: 28px;
  bottom: 1px;
}
</style>
