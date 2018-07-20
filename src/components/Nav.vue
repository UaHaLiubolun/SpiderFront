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
  import NavMenu from './NavMenu'
  export default {
    name: "NavTotal",
    components: {NavMenu},
    comments: {
      "nav-menu": NavMenu,
    },
    data() {
      return {
        currentPath: '/',
        listInfo: {
          url: '',
          parentUrl: '',
          name: '',
          isLeaf: true,
          children: [

          ]
        }
      }
    },

    created() {
      this.$axios.get(this.$url + "/newsList")
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
