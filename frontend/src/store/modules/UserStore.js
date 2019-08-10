import axios from "axios";

const state = {
  users: [
    {
      _id: "5d4c1180c9febb11cc512226",
      name: "name that loads if it didnt GET successfully",
      email: "uwotm8@gmail.com",
      password: "$2a$10$VZzmyYlHmEn9XKrrX7nclONPNUldwJhPpAuz/bR404hhYrcUYf3SK",
      date: "2019-08-08T12:11:44.543Z",
      __v: 0
    }
  ],
  token: localStorage.getItem("token") || null,
  authenticatedUser: {
    name: "no auth'd user",
    email: "test@email.com"
  }
};

const getters = {
  allUsers: state => state.users,
  getToken: state => state.token,
  getAuthenticatedUser: state => state.authenticatedUser,
  loggedIn: state => state.token != null
};

const actions = {
  fetchUsers({ commit }) {
    axios
      .get("http://creekmore.io/api/users")
      .then(response => {
        commit("setUsers", response.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  // GET TOKEN
  // Pretty sure i dont need this anymore
  async loginToken({ commit }, token) {
    console.log("set token: " + token);
    localStorage.setItem("token", token);
    commit("setToken", token);
  },
  authUser({ commit }) {
    console.log("State token: " + state.token);
    axios
      .get("http://creekmore.io/api/auth/user", {
        headers: { "x-auth-token": state.token }
      })
      .then(response => {
        console.log("User Registered:" + response.data.user);
        commit("setAuthenticatedUser", response.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  addUser({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://creekmore.io/api/users", {
          name: user.name,
          email: user.email,
          password: user.password
        })
        .then(res => {
          commit("newUser", res.data);
          commit("setAuthenticatedUser", res.data.user);
          localStorage.setItem("token", res.data.token);
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("http://creekmore.io/api/auth", {
          email: user.email,
          password: user.password
        })
        .then(res => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          commit("setAuthenticatedUser", res.data.user);
          resolve(res.data);
        })
        .catch(err => {
          //console.log(err);
          reject(err);
        });
    });
  },
  logout({ commit }) {
    if (state.token != null) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://creekmore.io/api/auth/logout", {
            name: "test logout"
          })
          .then(res => {
            console.log(res.data);
            localStorage.removeItem("token");
            commit("logout");
            resolve(res.data);
          })
          .catch(err => {
            console.log(err);
            localStorage.removeItem("token");
            commit("logout");
            reject(err);
          });
      });
    }
  }
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  newUser: (state, user) => (state.users = state.users.unshift(user)),
  setToken: (state, token) => (state.token = token),
  setAuthenticatedUser: (state, user) => (state.authenticatedUser = user),
  logout: state => (state.token = null)
};

export default {
  state,
  getters,
  actions,
  mutations
};
