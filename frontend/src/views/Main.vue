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
            </h4>
            <br />
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
    <div class="main main-raised">
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
                        alt="Thumbnail Image"
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
                        Thanks for visiting my page! I am an undergraduate
                        studying Management Information Systems and Business
                        Analytics at the University of North Carolina
                        Wilmington. I've always had a passion for technology and
                        learning new things. This website is the central
                        location for me to test out projects and new features.
                      </p>
                      <p class="card-description">Its not quite finished yet...</p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section text-center" id="projectStack">
        <div class="container">
          <h2 class="title">Project Stack</h2>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img :src="vueImg" alt="Thumbnail Image" class="img-fluid" />
                    </div>
                    <h4 class="card-title">
                      Vue
                      <br />
                      <small class="card-description text-muted">Frontend framework</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        Thanks to the developers of
                        <a href="https://vuejs.org/">Vue</a> and
                        <a
                          href="https://www.creative-tim.com/product/vue-material-kit"
                        >Vue Material Kit</a>, the front end dev felt effortless.
                      </p>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img :src="nodeImg" alt="Thumbnail Image" class="img-fluid" />
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
                      <img :src="expressImg" alt="Thumbnail Image" class="img-fluid" />
                    </div>
                    <h4 class="card-title">
                      Express
                      <br />
                      <small class="card-description text-muted">API framework</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        All API requests are directed to /api and are
                        asynchronous. This project is using
                        <a
                          href="https://mongoosejs.com/"
                        >mongoose</a> to
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
                      <img :src="mongodbImg" alt="Thumbnail Image" class="img-fluid" />
                    </div>
                    <h4 class="card-title">
                      MongoDB
                      <br />
                      <small class="card-description text-muted">Database</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        MongoDB is classified as a 'nosql' database that houses
                        all incoming messages and
                        <a
                          href="#/login"
                        >user profiles</a> (coming soon)
                      </p>
                    </md-card-content>
                  </md-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <md-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img :src="nginxImg" alt="Thumbnail Image" class="img-fluid" />
                    </div>
                    <h4 class="card-title">
                      NGINX
                      <br />
                      <small class="card-description text-muted">Web server</small>
                    </h4>

                    <md-card-content>
                      <p class="card-description">
                        Previously hosted from a Raspberry Pi 3 Model B. Now I'm
                        using a DigitalOcean droplet. The pi's ARMv7 cpu was
                        causing a lot of incompatibility with dokcer images.
                        <a
                          href="https://letsencrypt.org/"
                        >Let's Encrypt</a>
                        is giving me problems within docker. https coming
                        soon...
                      </p>
                    </md-card-content>
                  </md-card>
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
              <h2 class="text-center title">TODO...</h2>
              <h4 class="text-center description">Theres lots more to add. Things coming soon:</h4>
              <ul class="description">
                <li>Migrate from docker-compose to Kubernetes</li>
                <li>SSL certificates (this is being really finicky with docker)</li>
                <li>
                  User features
                  <ul>
                    <li style="text-decoration: line-through">Login and create account</li>
                    <li style="text-decoration: line-through">Password Hasing</li>
                    <li style="text-decoration: line-through">JWT authentication</li>
                    <li
                      style="text-decoration: line-through"
                    >State management with Vuex and localstorage</li>
                    <li>User dashboard enhancements</li>
                    <li>Protected routes with JWT and passport</li>
                    <li>Dynamic nav items for authenticated and not authenticated state</li>
                  </ul>
                </li>
                <li>Add relevant course work</li>
                <li>Add skills</li>
                <li>Add experience</li>
                <li>Eat lunch</li>
                <li>More personable pictures/backgrounds</li>
              </ul>
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
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button
                      class="md-success"
                      v-on:click="createMessage(name, email, message)"
                    >Send Message</md-button>
                  </div>
                </div>
                <br />
              </form>
              <div class="alert alert-success" id="emailAlert" v-show="showSuccessAlert">
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
              <div class="alert alert-danger" id="emailErrorAlert" v-show="showErrorAlert">
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
import axios from "axios";
//const validator = require("email-validator");
import * as EmailValidator from "email-validator";
export default {
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
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

      // console.log(process.env.VUE_APP_API_URL);
      console.log(process.env);

      axios
        .post("http://creekmore.io/api/messages", {
          name,
          email,
          message
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
