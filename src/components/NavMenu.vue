<template>
  <div class="NavMenu">
    <label v-for="info in listInfo">
      <el-submenu v-if="info.children !== null"
                  :index="info.url" :data="info" :key="info.url">
        <template slot="title">
          <span>{{info.name}}</span>
        </template>
        <nav-menu :listInfo="info.children"></nav-menu>
      </el-submenu>
      <el-menu-item v-if="info.children === null"
                    :index="'/listInfo/' + info.urlMd5"
                    :key="info.url">{{info.name}}
      </el-menu-item>
    </label>
  </div>
</template>

<script>
  export default {

    name: "NavMenu",
    props: ['listInfo'],

    data() {
      return {
        // listInfo: {
        //   url: '',
        //   parentUrl: '',
        //   name: '',
        //   isLeaf: true,
        //   children: [
        //
        //   ]
        // }
      }
    },

    created() {
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }
  }
</script>
