<template>
  <div>
    <el-form ref="siteTask" :model="node">
      <el-row>
        <el-col :span="4">
          <el-form-item label="节点名">
            <el-input v-model="node.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
        <el-button @click="addFather">添加父节点</el-button>
        <el-col :span="2">&nbsp;</el-col>
        <el-button @click="addRoot">添加跟节点</el-button>
      </el-row>
    </el-form>

    <div>
      <el-transfer
        filterable
        v-model="transferChoseData"
        :data="transferData"
        :props="transferProps">
        <el-button class="transfer-footer" slot="right-footer" size="small" @click="add">添加</el-button>
      </el-transfer>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'TreeDetail',
    data() {
      return {
        node: {
          id: 1,
          parentId: 1,
          name: null,
          sourceId: 0
        },
        transferProps: {
          key: "urlMd5",
          label: "name"
        },
        transferData: [],
        transferChoseData: []
      }
    },
    created () {
      this.setTransferData()
    },

    computed: {

    },

    methods: {
      setTransferData() {
        this.$axios.get(this.$url + "/newsList?isSplit=0")
          .then(rs => {
            this.transferData = rs.data.result
          })
      },
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
      getId() {
        return this.$route.path.split("/")[2];
      },
      addFather() {
        this.node.parentId = this.getId()
        this.node.id = Date.parse(new Date())
        this.submitData()
      },
      addRoot() {
        this.node.parentId = 0
        this.node.id = Date.parse(new Date())
        this.submitData()
      },
      add() {
        this.$axios.post(this.$url + "/site/tree/" + this.getId(), this.transferChoseData)
          .then(rs => {
            if (rs.data.code === 0) {
              this.transferChoseData = []
              this.setTransferData()
              alert("success")
            } else {
              alert("failed")
            }
          })
      },
      submitData() {
        this.$axios.post(this.$url + "/site/tree", this.node)
          .then(rs => {
            if (rs.data.code === 0) {
              alert("success")
            } else {
              alert("failed")
            }
          })
      }
    }
  }
</script>
