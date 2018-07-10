<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="site.domain"
      label="域名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="threadNum"
      label="线程"
      width="120">
    </el-table-column>
    <el-table-column
      prop="interval"
      label="间隔"
      width="120">
    </el-table-column>
    <el-table-column
      prop="run"
      label="是否运行"
      width="120"
      :formatter="boolRunForMatter">
    </el-table-column>
    <el-table-column
      prop="on"
      label="是否启动"
      width="120"
      :formatter="boolOnForMatter">
    </el-table-column>
    <el-table-column
      prop="lastTime"
      label="上次运行时间"
      width="120"
      :formatter="timeForMatter">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    created() {
      this.showTeacherList()
    },

    methods: {
      showTeacherList () {
        this.$axios.get(this.$url + "/siteTask")
          .then(response => {
            if (response.data.code === 0) {
              this.tableData = response.data.result
            }
          })
      },
      boolOnForMatter(row, column) {
        return row.on ? "是" : "否"
      },
      boolRunForMatter(row, column) {
        return row.run ? "是" : "否"
      },
      timeForMatter(row, column) {
        return this.$tools.fmtDate(row.lastTime * 1000)
      }
    },

    data() {
      return {
        tableData: []
      }
    }
  }
</script>
