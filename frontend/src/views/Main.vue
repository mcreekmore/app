<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100">
            <h1 class="title">Matt Creekmore</h1>
            <h4>
              Welcome to my page. I'm an aspiring software developer interested
              in full-stack web development, automation, data analytics, machine
              learning, hardware, and much more.
              <br />
              <br />Check out my lastest project: Moves!
              <br />It's available on
              iOS and Android
            </h4>
            <br />
            <div class="margin:auto">
              <md-button
                href="#/moves"
                class="md-success"
                style="justify-content:center;align-items:center"
              >Moves Landing Page</md-button>
            </div>

            <!-- <md-button
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              class="md-success md-lg"
              target="_blank"
            >
              <i class="fas fa-play"></i> Watch video
            </md-button>-->
          </div>
        </div>
      </div>
    </parallax>
    <div class="main">
      <!-- main-raised -->
      <!--<div class="section">
         <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center">
              <h2 class="title text-center">Let's talk product</h2>
              <h5 class="description">
                This is the paragraph where you can write more details about
                your product. Keep you user engaged by providing meaningful
                information. Remember that by this time, the user is curious,
                otherwise he wouldn't scroll to get here. Add a button if you
                want the user to see more.
              </h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-info">
                    <md-icon>chat</md-icon>
                  </div>
                  <h4 class="info-title">Free Chat</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-success">
                    <md-icon>verified_user</md-icon>
                  </div>
                  <h4 class="info-title">Verified Users</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-danger">
                    <md-icon>fingerprint</md-icon>
                  </div>
                  <h4 class="info-title">Fingerprint</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>-->
      <div class="section text-center">
        <div class="container">
          <h2 class="title">About Me</h2>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="mattProfile"
                        alt="Matt Creekmore profile image"
                        class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Matt Creekmore
                      <br />
                      <small class="card-description text-muted">Developer in training</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        Thanks for visiting my page! I'm an graduate of
                        Management Information Systems and Business
                        Analytics from the University of North Carolina
                        Wilmington. I've always had a passion for technology and
                        learning new things. This website is the central
                        location for me to test out projects and new features.
                      </p>
                    </md-card-content>

                    <md-card-actions class="text-center">
                      <md-button
                        href="https://www.linkedin.com/in/creekmore/"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-linkedin"></i>
                      </md-button>
                      <md-button
                        href="https://github.com/mcreekmore/"
                        target="_blank"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-github"></i>
                      </md-button>
                      <md-button
                        href="https://www.instagram.com/matthewcreekmore/"
                        class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </md-button>
                    </md-card-actions>
                  </md-card>

                  <md-button href="#/projects" class="md-success" style="margin:auto">My Projects</md-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Contact Me</h2>
              <h4
                class="text-center description"
              >Ask a question. Share something interesting. Tell me a secret...</h4>
              <h4 class="text-center description">
                This form will send me an email with your message! I'll respond
                to you as soon as possible.
              </h4>

              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Your Name</label>
                      <md-input v-model="name" type="text"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Your Email</label>
                      <md-input v-model="email" type="email"></md-input>
                    </md-field>
                  </div>
                </div>
                <md-field maxlength="5">
                  <label>Your Message</label>
                  <md-textarea v-model="message"></md-textarea>
                </md-field>
                <div class="md-layout">
                  <md-button
                    class="md-success"
                    style="margin:auto"
                    v-on:click="createMessage(name, email, message)"
                  >Send Message</md-button>
                </div>

                <br />
              </form>
              <div class="alert alert-success" id="emailAlert" v-show="showSuccessAlert">
                <div class="container">
                  <button
                    type="button"
                    aria-hidden="true"
                    class="close"
                    @click="(event) => removeNotify()"
                  >
                    <md-icon>clear</md-icon>
                  </button>
                  <div class="alert-icon">
                    <md-icon>check</md-icon>
                  </div>

                  <b>Email Sent Successfully</b>
                  : Thank you {{ nameAlert }} for submitting a message!
                </div>
              </div>
              <div class="alert alert-warning" v-show="showWarningAlert">
                <div class="container">
                  <button
                    type="button"
                    aria-hidden="true"
                    class="close"
                    @click="(event) => removeNotify()"
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
              <div class="alert alert-danger" id="emailErrorAlert" v-show="showErrorAlert">
                <div class="container">
                  <button
                    type="button"
                    aria-hidden="true"
                    class="close"
                    @click="(event) => removeNotify()"
                  >
                    <md-icon>clear</md-icon>
                  </button>
                  <div class="alert-icon">
                    <md-icon>info_outline</md-icon>
                  </div>
                  <b>Error sending email</b>
                  : Sorry {{ name }}, but something went wrong. Please try
                  again.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
//const validator = require("email-validator");
import * as EmailValidator from "email-validator";

// Vuex
import { mapActions } from "vuex";
export default {
  bodyClass: "landing-page",
  props: {
    auth: {
      loggedOut: false
    },
    header: {
      type: String,
      default: require("@/assets/img/space-bg.png")
    },
    mattProfile: {
      type: String,
      default: require("@/assets/img/faces/matt.jpg")
    },
    vueImg: {
      type: String,
      default: require("@/assets/img/stack/vue.png")
    },
    nodeImg: {
      type: String,
      default: require("@/assets/img/stack/node.png")
    },
    expressImg: {
      type: String,
      default: require("@/assets/img/stack/express.png")
    },
    mongodbImg: {
      type: String,
      default: require("@/assets/img/stack/mongodb.png")
    },
    nginxImg: {
      type: String,
      default: require("@/assets/img/stack/nginx.jpg")
    },
    dockerImg: {
      type: String,
      default: require("@/assets/img/stack/docker.jpg")
    }
  },
  data() {
    return {
      name: null,
      email: null,
      message: null,
      nameAlert: null,
      showSuccessAlert: false,
      showWarningAlert: false,
      showErrorAlert: false,
      warningAlertMessage: ""
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    ...mapActions(["sendEmail"]),
    createMessage(name, email, message) {
      // clear alerts on submission
      this.showSuccessAlert = false;
      this.showWarningAlert = false;
      this.showErrorAlert = false;

      if ((name == null) | (email == null) | (message == null)) {
        this.showWarningAlert = true;
        this.warningAlertMessage = "All fields are required";
        return;
      } else if (!this.isEmailValid(email)) {
        this.showWarningAlert = true;
        this.warningAlertMessage = "Must be a valid Email";
        this.email = null;
        return;
      }

      const messageSent = {
        name,
        email,
        message
      };

      this.sendEmail(messageSent)
        .then(res => {
          //console.log(res.data);
          //console.log(res.status);
          if (res.status == 200) {
            this.nameAlert = name;
            this.showSuccessAlert = true;
            this.showErrorAlert = false;
            this.name = null;
            this.email = null;
            this.message = null;
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

<style scoped lang="scss">
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
