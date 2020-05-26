<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      style="background-color:#40916C"
      :style="{ backgroundImage: 'url(' + require('@/assets/img/90sgraphicsedited.png') + ')' }"
    >
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100">
            <h1 class="title">Moves</h1>
            <h5>Important information on all your important places</h5>
            <!-- ios store -->
            <a
              href="https://apps.apple.com/us/app/moves-io/id1510664612?mt=8"
              style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2013-06-06&kind=iossoftware&bubble=ios_apps)
               no-repeat;width:135px;height:40px"
            ></a>
            <!-- play store -->
            <a
              href="https://play.google.com/store/apps/details?id=io.creekmore.moves&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
            >
              <div class>
                <div class style="width:135px">
                  <img alt="Get it on Google Play" :src="googlePlayButton" style="right:100px" />
                </div>
              </div>
            </a>
            <div v-if="isMobile()">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>

      <img
        v-if="!isMobile()"
        :src="screenshot1"
        alt="Screenshot of Moves app"
        style="position:absolute;bottom:0px;left:40%"
      />
      <img
        v-else
        :src="screenshot1"
        alt="Screenshot of Moves app"
        style="position:absolute;bottom:0px;width:90%"
      />
    </parallax>
    <div class="main">
      <div
        class="section text-center"
        id="projectStack"
        style="background-color:#d8f3dc"
        :style="{ backgroundImage: 'url(' + require('@/assets/img/90sgraphicsedited.png') + ')' }"
      >
        <div class="container">
          <h2 class="title">Need toilet paper but not sure where it's in stock?</h2>

          <h1 class="title">We got you.</h1>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <div v-if="!isMobile()" class="md-layout-item md-size-40 mx-auto">
                    <img
                      :src="screenshot2"
                      alt="Screen shot of app Maps page"
                      class="img-fluid"
                      style=" transform: rotate(10deg)"
                    />
                  </div>
                  <div v-else class="md-layout-item md-size-90 mx-auto">
                    <img
                      :src="screenshot2"
                      alt="Screen shot of app Maps page"
                      class="img-fluid"
                      style=" transform: rotate(10deg)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3
            class="title"
          >With Google Maps integration, its easier than ever to find the closest places near you that have what you need.</h3>
        </div>
      </div>
      <div
        class="section text-center"
        id="projectStack"
        style="background-color:#b7e4c7"
        :style="{ backgroundImage: 'url(' + require('@/assets/img/90sgraphicsedited.png') + ')' }"
      >
        <div class="container">
          <h2 class="title">But we didn't just stop with toilet paper...</h2>
          <h3
            class="title"
          >In these unprecedented times, some products are more important now than ever.</h3>
          <h3 class="title">We got those too.</h3>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <div v-if="!isMobile()" class="md-layout-item md-size-40 mx-auto">
                    <img
                      :src="screenshot3"
                      alt="Screen shot of app Maps page"
                      class="img-fluid"
                      style=" transform: rotate(-10deg)"
                    />
                  </div>
                  <div v-else class="md-layout-item md-size-90 mx-auto">
                    <img
                      :src="screenshot3"
                      alt="Screen shot of app Maps page"
                      class="img-fluid"
                      style=" transform: rotate(-10deg)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="section text-center"
        id="projectStack"
        style="background-color:#95D5B2"
        :style="{ backgroundImage: 'url(' + require('@/assets/img/90sgraphicsedited.png') + ')' }"
      >
        <div class="container">
          <h2 class="title">
            Completely Safe
            <br />&
            <br />Fully Free
          </h2>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <div v-if="!isMobile()" class="md-layout-item md-size-40 mx-auto">
                    <img
                      :src="screenshot4"
                      alt="Screen shot of app Maps page"
                      class="img-fluid"
                      style=" transform: rotate(10deg)"
                    />
                  </div>
                  <div v-else class="md-layout-item md-size-90 mx-auto">
                    <img
                      :src="screenshot4"
                      alt="Screen shot of app Maps page"
                      class="img-fluid"
                      style=" transform: rotate(10deg)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 class="title">Your location is never recorded and sign in data is encrypted.</h3>
          <h3 class="title">No pesky ads either ;)</h3>
        </div>
      </div>
      <div
        class="section text-center"
        id="projectStack"
        style="background-color:#74C69D"
        :style="{ backgroundImage: 'url(' + require('@/assets/img/90sgraphicsedited.png') + ')' }"
      >
        <div class="container">
          <h2 class="title">User Powered.</h2>
          <h3 class="title">Your places. Your updates.</h3>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <div v-if="!isMobile()" class="md-layout-item md-size-40 mx-auto">
                    <img
                      :src="screenshot5"
                      alt="Screen shot of app Maps page"
                      class="img-fluid"
                      style=" transform: rotate(-10deg)"
                    />
                  </div>
                  <div v-else class="md-layout-item md-size-90 mx-auto">
                    <img
                      :src="screenshot5"
                      alt="Screen shot of app Maps page"
                      class="img-fluid"
                      style=" transform: rotate(-10deg)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 class="title">Your location is never recorded and sign in data is encrypted.</h3>
        </div>
      </div>
      <div
        class="section text-center"
        id="projectStack"
        style="background-color:#40916C"
        :style="{ backgroundImage: 'url(' + require('@/assets/img/90sgraphicsedited.png') + ')' }"
      >
        <div class="container">
          <h2 class="title">Download today!</h2>

          <!-- ios store -->
          <a
            href="https://apps.apple.com/us/app/moves-io/id1510664612?mt=8"
            style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/en-us/badge-lrg.svg?releaseDate=2013-06-06&kind=iossoftware&bubble=ios_apps)
               no-repeat;width:135px;height:40px;margin:auto"
          ></a>
          <br />
          <!-- play store -->
          <a
            style="margin:auto"
            href="https://play.google.com/store/apps/details?id=io.creekmore.moves&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          >
            <div class>
              <div class style="width:135px">
                <img alt="Get it on Google Play" :src="googlePlayButton" style="right:100px" />
              </div>
            </div>
          </a>
          <br />
          <br />

          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <div v-if="!isMobile()" class="md-layout-item md-size-40 mx-auto">
                    <img :src="movesCircle" alt="Screen shot of app Maps page" class="img-fluid" />
                  </div>
                  <div v-else class="md-layout-item md-size-90 mx-auto">
                    <img :src="movesCircle" alt="Screen shot of app Maps page" class="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div class="margin:auto">
          <md-button
            href="#/moves/privacy"
            class="md-success"
            style="justify-content:center;align-items:center"
          >Privacy Policy</md-button>
        </div>
      </div>
    </div>
    <div class="text-center" id="projectStack">
      <br />
      <a
        href="https://www.vecteezy.com/free-vector/1980s"
        style="text-align: center;"
      >1980s Vectors by Vecteezy</a>
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
      default: require("@/assets/img/bg-2.jpg")
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
    },
    flutterImg: {
      type: String,
      default: require("@/assets/img/stack/flutter.png")
    },
    googlePlayButton: {
      type: String,
      default: require("@/assets/img/google-play-badge.png")
    },
    screenshot1: {
      type: String,
      default: require("@/assets/img/screenshots/iphone8screenshot1.png")
    },
    screenshot2: {
      type: String,
      default: require("@/assets/img/screenshots/iphone8screenshot2.png")
    },
    screenshot3: {
      type: String,
      default: require("@/assets/img/screenshots/iphone8screenshot3.png")
    },
    screenshot4: {
      type: String,
      default: require("@/assets/img/screenshots/iphone8screenshot4.png")
    },
    screenshot5: {
      type: String,
      default: require("@/assets/img/screenshots/iphone8screenshot5.png")
    },
    graphics: {
      type: String,
      default: require("@/assets/img/90sgraphicsedited.png")
    },
    movesCircle: {
      type: String,
      default: require("@/assets/img/m-circle.png")
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
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
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
