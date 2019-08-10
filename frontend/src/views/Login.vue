<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button>
              <p slot="description" class="description">creekmore.io db</p>
              <!-- <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>First Name...</label>
                <md-input v-model="name"></md-input>
              </md-field>-->
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input
                  v-model="email"
                  type="email"
                  @keyup.enter="createUser(email, password)"
                ></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input
                  type="password"
                  v-model="password"
                  @keyup.enter="createUser(email, password)"
                ></md-input>
              </md-field>
              <md-button
                href="#/register"
                slot="footer"
                class="md-simple md-warning md-lg"
                >Register</md-button
              >
              <md-button
                v-on:click="createUser(email, password)"
                slot="footer"
                class="md-simple md-success md-lg"
                >Login</md-button
              >
            </login-card>
            <br />
            <div
              class="alert alert-success"
              id="emailAlert"
              v-show="showSuccessAlert"
            >
              <div class="container">
                <button
                  type="button"
                  aria-hidden="true"
                  class="close"
                  @click="event => removeNotify()"
                >
                  <md-icon>clear</md-icon>
                </button>
                <div class="alert-icon">
                  <md-icon>check</md-icon>
                </div>

                <b>Login Successful</b>
                <br />Thank you for logging in!
              </div>
            </div>
            <div class="alert alert-warning" v-show="showWarningAlert">
              <div class="container">
                <button
                  type="button"
                  aria-hidden="true"
                  class="close"
                  @click="event => removeNotify()"
                >
                  <md-icon>clear</md-icon>
                </button>
                <div class="alert-icon">
                  <md-icon>warning</md-icon>
                </div>
                <b>Warning</b>
                <br />
                {{ warningAlertMessage }}
              </div>
            </div>
            <div
              class="alert alert-danger"
              id="emailErrorAlert"
              v-show="showErrorAlert"
            >
              <div class="container">
                <button
                  type="button"
                  aria-hidden="true"
                  class="close"
                  @click="event => removeNotify()"
                >
                  <md-icon>clear</md-icon>
                </button>
                <div class="alert-icon">
                  <md-icon>info_outline</md-icon>
                </div>
                <b>Error logging in</b>
                <br />Invalid Credentials
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginCard } from "@/components";
//import axios from "axios";
import * as EmailValidator from "email-validator";
import MainNavBar from "../layout/MainNavbar";

// Vuex
import { mapActions } from "vuex";

export default {
  components: {
    LoginCard,
    MainNavBar
  },
  bodyClass: "login-page",
  data() {
    return {
      email: null,
      showSuccessAlert: false,
      showWarningAlert: false,
      warningAlertMessage: null,
      showErrorAlert: false,
      nameAlert: null,
      name: null,
      password: null
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/space-bg.png")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    //vuex add user
    ...mapActions(["loginToken", "login"]),

    createUser(email, password) {
      // clear alerts on submission
      this.showSuccessAlert = false;
      this.showWarningAlert = false;
      this.showErrorAlert = false;

      if ((email == null) | (password == null)) {
        this.showWarningAlert = true;
        this.warningAlertMessage = "All fields are required";
        return;
      } else if (!this.isEmailValid(email)) {
        this.showWarningAlert = true;
        this.warningAlertMessage = "Must be a valid Email";
        this.email = null;
        return;
      }

      const user = {
        email,
        password
      };

      this.login(user)
        .then(() => {
          this.$router.push({ name: "profile" });
        })
        .catch(() => {
          this.showErrorAlert = true;
        });
    },
    removeNotify() {
      this.showSuccessAlert = false;
      this.showWarningAlert = false;
      this.showErrorAlert = false;
      this.warningAlertMessage = "";
    },
    isEmailValid(email) {
      return EmailValidator.validate(email);
    }
  }
};
</script>

<style lang="css"></style>
