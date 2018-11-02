<template>
  <div>
    <div id="tree">
      <el-container style="height: 100vh">
        <el-aside width="20%" height="100%">
          <x-nav class="nav"></x-nav>
        </el-aside>
        <el-container>
          <el-main>
            <router-view :key="key" class="content"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
  import nav from '@/components/TreeNav.vue'
  export default {
    name: 'tree',
    components: {
      'x-nav': nav,
    },
    data() {
      return {

      }
    },
    created () {

    },

    computed: {

    },

    methods: {

    }
  }
</script>
