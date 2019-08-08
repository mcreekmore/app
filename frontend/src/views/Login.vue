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
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>First Name...</label>
                <md-input v-model="name"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input type="password" v-model="password"></md-input>
              </md-field>
              <md-button
                onclick="history.back()"
                slot="footer"
                class="md-simple md-warning md-lg"
                >Back</md-button
              >
              <md-button
                v-on:click="createUser(name, email, password)"
                slot="footer"
                class="md-simple md-success md-lg"
                >Get Started</md-button
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

                <b>User Authentication Successful!</b>
                : Thank you {{ nameAlert }} for logging in!
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
                : {{ warningAlertMessage }}
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
                <b>Error sending email</b>
                : Sorry {{ name }}, but something went wrong. Please try again.
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
import axios from "axios";
import * as EmailValidator from "email-validator";

export default {
  components: {
    LoginCard
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
      default: require("@/assets/img/profile_city.jpg")
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
    createUser(name, email, password) {
      // clear alerts on submission
      this.showSuccessAlert = false;
      this.showWarningAlert = false;
      this.showErrorAlert = false;

      if ((name == null) | (email == null) | (password == null)) {
        this.showWarningAlert = true;
        this.warningAlertMessage = "All fields are required";
        return;
      } else if (!this.isEmailValid(email)) {
        this.showWarningAlert = true;
        this.warningAlertMessage = "Must be a valid Email";
        this.email = null;
        return;
      }

      // console.log(process.env.VUE_APP_API_URL);
      //console.log(process.env);

      axios
        .post("http://creekmore.io/api/users", {
          name,
          email,
          password
        })
        .then(res => {
          //console.log(res.data);
          //console.log(res.status);
          if (res.status == 200) {
            this.nameAlert = name;
            this.showSuccessAlert = true;
            this.showErrorAlert = false;
            this.name = null;
            this.email = null;
            this.password = null;
          } // else if (!res.body.email) { // Warning
          //   console.log("bad email");
          //   this.showWarningAlert = true;
          // }
          else {
            this.nameAlert = name;
            this.showErrorAlert = true;
          }
        })
        .catch(err => {
          console.log(err);
          this.nameAlert = name;
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
