<template>
  <div class="section profile-content">
    <div class="container">
      <div class="md-layout">
        <div class="md-layout-item md-size-50 mx-auto">
          <div class="profile">
            <div class="avatar">
              <img :src="img" alt="Circle Image" class="img-raised rounded-circle img-fluid" />
            </div>
            <div class="name">
              <h3 class="title">{{ getAuthenticatedUser.name }}</h3>
              <h6>creekmore.io user</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="description text-center">
        <p>This is your private page</p>
      </div>
      <div class="container center">
        <div id="navigation-pills">
          <div>
            <h4 class="title text-center">User Info</h4>
          </div>
          <div class="md-layout">
            <div>
              <!-- above: class="md-layout-item md-size-50 md-small-size-100" -->
              <tabs
                :tab-name="['Dashboard', 'Schedule', 'Users']"
                :tab-icon="['dashboard', 'schedule', 'perm_identity']"
                plain
                flex-column
                nav-pills-icons
                color-button="primary"
              >
                <!-- here you can add your content for tab-content -->
                <template slot="tab-pane-1">
                  Collaboratively administrate empowered markets via
                  plug-and-play networks. Dynamically procrastinate B2C users
                  after installed base benefits.
                  <br />
                  <br />Dramatically visualize customer directed convergence
                  without revolutionary ROI.
                </template>
                <template slot="tab-pane-2">
                  Efficiently unleash cross-media information without
                  cross-media value. Quickly maximize timely deliverables for
                  real-time schemas.
                  <br />
                  <br />Dramatically maintain clicks-and-mortar solutions
                  without functional solutions.
                </template>
                <template slot="tab-pane-3">Going to put the users table here</template>
              </tabs>
            </div>
          </div>
        </div>

        <div>
          <md-button @click="logoutClick()" class="md-danger">Logout</md-button>
        </div>
      </div>
      <h4 class="title text-center">All Users</h4>
      <div class="container">
        <table>
          <tr>
            <th align="left">ID</th>
            <th align="left">Name</th>
            <th align="left">Email</th>
          </tr>
          <tr v-for="user in allUsers" :key="user.id">
            <td>{{ user._id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </table>
      </div>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";

// VUEX
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProfileComp",
  components: {
    Tabs
  },
  bodyClass: "profile-page",
  data() {
    return {
      name: "Mr. Creekmore"
    };
  },
  props: {
    img: {
      type: String,
      default: require("@/assets/img/generic-user-icon.jpg")
    }
  },
  methods: {
    ...mapActions(["fetchUsers", "logout"]),
    logoutClick() {
      this.logout().then(res => {
        this.$router.push({ name: "index" }).catch(err => {
          this.$router.push({ name: "index" });
        });
      });
    }
  },
  computed: mapGetters(["allUsers", "getAuthenticatedUser"]),
  created() {
    this.fetchUsers();
    //let localState = localStorage.getItem("vuex");
    //console.log("Authenticated User: " + localStorage.getItem("token"));
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.profile-tabs /deep/ {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
