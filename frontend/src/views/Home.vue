<template>
  <div class="home">
    <carousel />
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>Hello World!</p>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Product</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-bind:key="item.id" v-for="item in info">
          <!-- <th scope="row">1</th> -->
          <td v-text="item.id"></td>
          <td v-text="item.name"></td>
          <td v-text="item.product"></td>
          <td>
            <button class="btn btn-primary">Update</button>
          </td>
          <td>
            <button class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import carousel from "../components/carousel";
export default {
  name: "home",
  components: {
    carousel
  },
  data: function() {
    return {
      info: [
        {
          id: "1",
          name: "No",
          product: "sure?"
        },
        {
          id: "2",
          name: "Yes",
          product: "something?"
        },
        {
          id: "3",
          name: "Maybe",
          product: "huh?"
        },
        {
          id: "4",
          name: "Yes",
          product: "idk?"
        }
      ]
    };
  },
  methods: {}
};
</script>
