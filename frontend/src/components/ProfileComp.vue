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
          <div class="title">
            <h3>Navigation Pills</h3>
          </div>

          <div class="md-layout">
            <div>
              <tabs
                :tab-name="['Dashboard', 'Users', 'Settings']"
                :tab-icon="['dashboard', 'schedule', 'list']"
                plain
                nav-pills-icons
                color-button="primary"
              >
                <!-- here you can add your content for tab-content -->
                <template slot="tab-pane-1">Dashboard features coming soon...</template>
                <template slot="tab-pane-2">
                  <h4 class="title text-center">All Users</h4>
                  <div class="container">
                    <table>
                      <tr>
                        <th align="left">Name</th>
                        <th align="left">Email</th>
                      </tr>
                      <tr v-for="user in allUsers" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                      </tr>
                    </table>
                  </div>
                </template>

                <template slot="tab-pane-3">
                  <input type="file" @change="onFileChanged" />
                </template>
              </tabs>
            </div>
          </div>
        </div>
        <div style="text-align:center">
          <md-button @click="logoutClick()" class="md-danger">Logout</md-button>
        </div>
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
    return {};
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
      this.logout()
        .then(() => {
          this.$router.push({ name: "index" });
        })
        .catch(() => {
          this.$router.push({ name: "index" });
        });
    }
  },
  computed: mapGetters(["allUsers", "getAuthenticatedUser"]),
  created() {
    this.fetchUsers();
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
