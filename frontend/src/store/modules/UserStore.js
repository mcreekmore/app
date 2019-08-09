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
  token: "u wot",
  authenticatedUser: {
    name: "no auth'd user",
    email: "test@email.com"
  }
};

const getters = {
  allUsers: state => state.users,
  getToken: state => state.token,
  getAuthenticatedUser: state => state.authenticatedUser
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await axios.get("http://creekmore.io/api/users");

    // 'commits' to mutation to add to state
    commit("setUsers", response.data);
  },
  // async addUser({ commit }, user) {
  //   console.log(user);
  //   name = user.name;
  //   email = user.email;
  //   password = user.password;

  //   const response = await axios
  //     .post("http://creekmore.io/api/users", {
  //       name,
  //       email,
  //       password
  //     })
  //     .then(res => {
  //       return new Promise(res);
  //     });

  //   // commit to state
  //   commit("newUser", response.data);
  // },
  // GET TOKEN
  async loginToken({ commit }, token) {
    // TODO
    //const response = token;
    console.log("set token: " + token);
    localStorage.setItem("token", token);
    commit("setToken", token);
  },
  async getUser({ commit }) {
    console.log("State token: " + localStorage.getItem("token"));
    const response = await axios.get("http://creekmore.io/api/auth/user", {
      headers: { "x-auth-token": localStorage.getItem("token") }
    });
    console.log(response.data);
    commit("setAuthenticatedUser", response.data);
  }
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  newUser: (state, user) => (state.users = state.users.unshift(user)),
  setToken: (state, token) => (state.token = token),
  setAuthenticatedUser: (state, user) => (state.authenticatedUser = user)
};

export default {
  state,
  getters,
  actions,
  mutations
};
