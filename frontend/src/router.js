import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Main.vue"; // my custom page
import Landing from "./views/Landing.vue";
import About from "./views/About.vue"; // about
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Projects from "./views/Projects.vue";
import Moves from "./views/Moves.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import PrivacyPolicy from "./views/PrivacyPolicy.vue";
import ICO from "./views/ICO.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "index",
      components: { default: Index, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
        auth: { loggedOut: false },
      },
    },
    {
      path: "/landing",
      name: "landing",
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/projects",
      name: "projects",
      components: { default: Projects, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/moves",
      name: "moves",
      components: { default: Moves, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/login",
      name: "login",
      components: { default: Login, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
      },
    },
    {
      path: "/register",
      name: "register",
      components: { default: Register, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
      },
    },
    {
      path: "/user/profile",
      name: "profile",
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/about",
      name: "about",
      components: { default: About, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/moves/privacy",
      name: "privacy",
      components: {
        default: PrivacyPolicy,
        header: MainNavbar,
        footer: MainFooter,
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
    {
      path: "/ico",
      name: "ICO",
      components: { default: ICO, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" },
      },
    },
  ],
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// public routes that do not require auth
const openRoutes = [
  "login",
  "register",
  "index",
  "eSports",
  "about",
  "projects",
  "privacy",
  "moves",
  "ICO",
];

// if route is open, continue
// if route is private and a token is available, continue
// else redirect to /login
router.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    next();
  } else if (localStorage.getItem("token") != null) {
    next();
  } else {
    next("/login");
  }
});

export default router;
