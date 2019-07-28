<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/creekmore/">LinkedIn</a>
          </li>
          <li>
            <a href="https://github.com/mcreekmore/">GitHub</a>
          </li>
          <li>
            <a href="https://www.instagram.com/matthewcreekmore/">Instagram</a>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, made by
        <a href="https://www.google.com/" target="_blank">Matt Creekmore</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
