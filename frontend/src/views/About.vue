<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
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
    <div class="main">
      <h1>About me</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>
