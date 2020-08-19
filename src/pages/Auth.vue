<template>
  <q-page class="column q-pa-lg q-mt-md">
    <q-icon
      name="account_box"
      color="blue"
      style="font-size: 100px"
      class="q-mx-auto"
    />
    <q-form @submit="login" class="q-gutter-md q-mt-md">
      <q-input v-model="formData.email" label="Email" dense rounded outlined />
      <q-input
        v-model="formData.password"
        label="Password"
        :type="isPwd ? 'password' : 'text'"
        dense
        rounded
        outlined
        ><template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          /> </template
      ></q-input>
      <div class="row">
        <q-space />
        <q-btn
          @click="dialog = true"
          label="Create account"
          no-caps
          color="primary"
          flat
        />
        <q-btn label="Log in" type="submit" color="primary" flat />
      </div>
    </q-form>

    <q-dialog
      v-model="dialog"
      @before-show="resetForm"
      @before-hide="resetForm"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="column">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title class="absolute-center">
            Register
          </q-toolbar-title>
          <q-btn flat icon="close" v-close-popup class="absolute-right" />
        </q-toolbar>

        <q-card-section>
          <div class="text-body1">Create an account.</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="regForm" @submit="register" class="q-gutter-md">
            <q-input v-model="formData.name" label="Name" dense filled />
            <q-input
              v-model="formData.username"
              label="Username"
              dense
              outlined
            />
            <q-input
              v-model="formData.email"
              type="email"
              label="Email"
              dense
              outlined
            />
            <q-input
              v-model="formData.password"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              dense
              outlined
              ><template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                /> </template
            ></q-input>
            <div class="row">
              <q-space />
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn label="Save" type="submit" color="primary" flat />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
const resetForm = () => {
  return { name: "", email: "", password: "" };
};

export default {
  data() {
    return {
      dialog: false,
      isPwd: true,
      formData: {
        name: "",
        username: "",
        email: "",
        password: ""
      }
    };
  },

  methods: {
    ...mapActions("user", ["addUser", "loginUser"]),

    login() {
      this.$q.loadingBar.start();
      this.loginUser(this.formData).then(response => {
        this.$q.loadingBar.stop();
      });
    },
    register() {
      this.$q.loading.show();
      this.addUser(this.formData).then(() => {
        this.$q.loading.hide();
      });
    },
    resetForm() {
      this.formData = resetForm();
    }
  }
};
</script>
