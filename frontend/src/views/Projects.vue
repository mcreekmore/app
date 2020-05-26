<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">My Projects</h1>
            <h4>Checkout what I've done!</h4>
            <br />
          </div>
        </div>
      </div>
    </parallax>
    <div class="main">
      <div class="section text-center" id="projectStack">
        <div class="container">
          <h1 class="title">Moves</h1>
          <h2 class="title">Full Stack, Cross Platform App</h2>

          <div class="margin:auto">
            <md-button
              href="#/moves"
              class="md-success"
              style="justify-content:center;align-items:center"
              >Moves Landing Page</md-button
            >
          </div>
          <h3 class="title">Project Stack</h3>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="flutterImg"
                        alt="Image of Vue Java Script"
                        class="img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Flutter
                      <br />
                      <small class="card-description text-muted"
                        >Frontend framework</small
                      >
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        <a href="https://flutter.dev/">Flutter</a> is Googles
                        multi-platform mobile development framework that made it
                        quick and easy to learn and hit the ground running. Also
                        with their already flourishing community, there was no
                        shortage of packages that I couldn't have done this
                        without.
                      </p>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="nodeImg"
                        alt="Image of Node Java Script"
                        class="img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Node, Express, MongoDB, NGINX
                      <br />
                      <small class="card-description text-muted">Backend</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        Thanks to all of the work that I put in on this website
                        previously, I was able to leverage the existing backend
                        architecture to support all of my logic and database
                        functions.
                      </p>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section text-center" id="projectStack">
        <div class="container">
          <h1 class="title" id="creekmoreio">creekmore.io</h1>
          <h3 class="title">Project Stack</h3>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="vueImg"
                        alt="Image of Vue Java Script"
                        class="img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Vue
                      <br />
                      <small class="card-description text-muted"
                        >Frontend framework</small
                      >
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        VueJS with Vuex for state-management and vue-router. JWT
                        (JSON Web Tokens) are used for authentication. Thanks to
                        the developers of
                        <a href="https://vuejs.org/">Vue</a> and
                        <a
                          href="https://www.creative-tim.com/product/vue-material-kit"
                          >Vue Material Kit</a
                        >, the front end dev felt effortless.
                      </p>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="nodeImg"
                        alt="Image of Node Java Script"
                        class="img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Node
                      <br />
                      <small class="card-description text-muted">Backend</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        <a href="https://nodejs.org/en/">Node.js</a> is running
                        on its own container, using nginx as a reverse proxy to
                        route /api/ requests.
                      </p>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="expressImg"
                        alt="Image of Express Java Script"
                        class="img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Express
                      <br />
                      <small class="card-description text-muted"
                        >API framework</small
                      >
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        All API requests are directed to /api and are
                        asynchronous. This project is using
                        <a href="https://mongoosejs.com/">mongoose</a> to
                        interface with mongo. Depending on how the project
                        evolves, I may add a SQL database.
                      </p>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="mongodbImg"
                        alt="Image of Mongo Database "
                        class="img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      MongoDB
                      <br />
                      <small class="card-description text-muted"
                        >Database</small
                      >
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        MongoDB is classified as a 'nosql' database that houses
                        all incoming messages and
                        <a href="#/login">user profiles</a>. All passwords are
                        hashed.
                      </p>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="nginxImg"
                        alt="Image of Nginx (pronounced engine X)"
                        class="img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      NGINX
                      <br />
                      <small class="card-description text-muted"
                        >Web server</small
                      >
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        Previously hosted from a Raspberry Pi 3 Model B. Now I'm
                        using a DigitalOcean droplet. The pi's ARMv7 cpu was
                        causing a lot of incompatibility with dokcer images.
                        <a href="https://letsencrypt.org/">Let's Encrypt</a>
                        is giving me problems within docker. https coming
                        soon...
                      </p>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                        :src="dockerImg"
                        alt="Image of Docker, the containerization software"
                        class="img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Docker
                      <br />
                      <small class="card-description text-muted"
                        >Containerization</small
                      >
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        <a href="https://www.docker.com/">Docker</a>
                        is a container virtualization tool that's perfect for a
                        micro-services architecture. Using docker-compose, I'm
                        able to seamlessly run multiple containers in-sync on
                        the same network. Currently, I'm testing a
                        <a href="https://kubernetes.io/">Kubernetes</a>
                        implementation
                      </p>
                    </md-card-content>
                  </md-card>
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
      loggedOut: false,
    },
    header: {
      type: String,
      default: require("@/assets/img/bg-2.jpg"),
    },
    mattProfile: {
      type: String,
      default: require("@/assets/img/faces/matt.jpg"),
    },
    vueImg: {
      type: String,
      default: require("@/assets/img/stack/vue.png"),
    },
    nodeImg: {
      type: String,
      default: require("@/assets/img/stack/node.png"),
    },
    expressImg: {
      type: String,
      default: require("@/assets/img/stack/express.png"),
    },
    mongodbImg: {
      type: String,
      default: require("@/assets/img/stack/mongodb.png"),
    },
    nginxImg: {
      type: String,
      default: require("@/assets/img/stack/nginx.jpg"),
    },
    dockerImg: {
      type: String,
      default: require("@/assets/img/stack/docker.jpg"),
    },
    flutterImg: {
      type: String,
      default: require("@/assets/img/stack/flutter.png"),
    },
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
      warningAlertMessage: "",
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
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
        message,
      };

      this.sendEmail(messageSent)
        .then((res) => {
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
        .catch((err) => {
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
    },
  },
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
