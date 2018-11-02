<template>
  <div class="NavMenu">
    <label v-for="info in listInfo">
      <el-submenu v-if="info.sourceId === 0"
                  :index = "info.id"
                  :data="info" :key="info.id">
        <template slot="title">
          <span>{{info.name}}</span>
          <span class="tree-btn">
            <i class="el-icon-plus" @click.stop="nodeAdd(info.id, info.parentId)"></i>
            <i class="el-icon-delete" @click.stop="nodeDel(info.id, info.parentId)"></i>
        </span>
        </template>
        <tree-nav-menu :listInfo="info.children"></tree-nav-menu>
      </el-submenu>
      <el-menu-item v-if="info.sourceId !== 0"
                    :index="'/treeDetail/' + info.id"
                    :key="info.parentId">{{info.name}}
        <span class="tree-btn">
            <i class="el-icon-delete" @click.stop="nodeDel(info.id, info.parentId)"></i>
        </span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
  export default {

    name: "TreeNavMenu",
    props: ['listInfo'],

    data() {
      return {
        listInfo: [{
          sourceId: 0,
          id: 1,
          parentId: 1,
          name: "",
          children: []
        }]
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
      nodeDel(id, parentId) {
        this.$axios.delete(this.$url + "/site/tree?id=" + id + "&parentId=" + parentId)
          .then(rs => {
            for (let i in this.listInfo) {
              if (this.listInfo[i].id === id) {
                this.listInfo.splice(i, 1)
              }
            }
          })
      },
      nodeAdd(id, parentId) {
        this.$router.push({path: "/treeDetail/" + id})
      }
    }
  }
</script>
