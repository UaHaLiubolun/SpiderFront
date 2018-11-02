<template>
  <div>
    <el-menu
      :router="true"
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <nav-menu :listInfo="listInfo"></nav-menu>
    </el-menu>
  </div>
</template>
<script>
  import NavMenu from './TreeNavMenu.vue'
  export default {
    name: "TreeNav",
    components: {NavMenu},
    comments: {
      "nav-menu": NavMenu,
    },
    data() {
      return {
        listInfo: [],
      }
    },

    created() {
      this.$axios.get(this.$url + "/site/tree")
        .then(rs => {
          this.listInfo = rs.data.result
        })
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
