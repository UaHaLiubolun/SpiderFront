<template>
  <div>
  <div>
    <el-button @click="addGzhDia = true">添加公众号</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="name"
        label="公众号名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="gzhId"
        label="公众号ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sourceId"
        label="SourceID"
        width="130">
      </el-table-column>
      <el-table-column
        prop="interval"
        label="间隔"
        width="120">
      </el-table-column>
      <el-table-column
        prop="on"
        label="是否开启"
        width="120">
      </el-table-column>
      <el-table-column
        prop="lastTime"
        label="上次运行时间"
        :formatter="formatTime"
        width="170">
      </el-table-column>
      <el-table-column
        prop="count"
        label="抓取数量"
        width="120">
      </el-table-column>
      <el-table-column
        label="操作"
        width="50">
        <template slot-scope="scope">
          <el-button @click="deleteGzh(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div>
    <el-dialog title="添加公众号" :visible.sync="addGzhDia">
      <el-form>
        <el-form-item label="公众号名称">
          <el-input v-model="gzhData.name"></el-input>
        </el-form-item>
        <el-form-item label="公众号ID">
          <el-input v-model="gzhData.gzhId"></el-input>
        </el-form-item>
        <el-form-item label="间隔">
          <el-input v-model="gzhData.interval"></el-input>
        </el-form-item>
        <el-form-item label="是否开启">
          <el-input v-model="gzhData.on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addGzh()">添加</el-button>
        <el-button @click="addGzhDia = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
  export default {
    name: "Gzh",
    data() {
      return {
        addGzhDia: false,
        gzhData: {
          gzhId: "",
          name: "",
          interval: "36000",
          on: "true",
          count: 1,
          type: "国内新闻",
          lastTime: "0"
        },
        tableData: [
          {
            "lastTime": "1537489107",
            "gzhId": "bjnews_xjb",
            "name": "新京报",
            "count": "1",
            "interval": "10000",
            "type": "国内新闻",
            "on": "false",
            "sourceId": "123"
          }
        ]
      }
    },
    created() {
      this.$axios.get(this.$url + "/gzh?isCount=1")
        .then(rs => {
          if (rs.data.code === 0) {
            this.tableData = rs.data.result
          }
        })
    },
    methods: {
      deleteGzh(row) {
        this.$axios.delete(this.$url + "/gzh/" + row.gzhId)
          .then(rs => {
            if (rs.data.code === 0) {
              alert("删除成功")
              location.reload()
            }
          })
      },
      addGzh() {
        this.$axios.post(this.$url + "/gzh", this.gzhData)
          .then(rs => {
            if (rs.data.code === 0) {
              alert("添加成功")
              location.reload()
            } else {
              alert("已经有啦。不能在重复添加了")
            }
          })
      },
      formatTime(row, column) {
        const date = new Date(row[column.property] * 1000)
        console.log(row[column.property])
        return date.getFullYear() + '年' +
            date.getMonth() + '月' +
            date.getDate() + '日 ' +
            date.getHours() + ':' +
            date.getMinutes()
      }
    }
  }
</script>
