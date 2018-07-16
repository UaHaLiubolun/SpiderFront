<template>
  <div>
    <div id="home">
      <el-container style="height: 100vh">
        <el-aside width="25%" height="100%">
          <x-nav class="nav"></x-nav>
        </el-aside>
        <el-container>
          <el-header>
            <el-button @click="addListInfo()">添加</el-button>
          </el-header>
          <el-main>
            <router-view class="content"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
    <div>
      <el-dialog title="列表信息" :visible.sync="dialogFormVisible">
        <el-form :model="listInfo">
          <el-form-item label="列表名称" :label-width="formLabelWidth">
            <el-input v-model="listInfo.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="列表Url" :label-width="formLabelWidth">
            <el-input v-model="listInfo.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="父级列表" :label-width="formLabelWidth">
            <el-input v-model="listInfo.parentUrl" auto-complete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="父级列表" :label-width="formLabelWidth">-->
            <!--<el-select v-model="listInfo.parentUrl">-->
              <!--<el-option label="新浪网" value="sina.com.cn"></el-option>-->
              <!--<el-option label="凤凰网" value="ifeng.com"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="是否叶子列表">
            <el-switch v-model="listInfo.leaf"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitListInfo()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import nav from '@/components/Nav.vue'
  export default {
    name: 'home',
    components: {
      'x-nav': nav,
    },
    data() {
      return {
        formLabelWidth: '120px',
        dialogFormVisible: false,
        listInfo: {
          name: '',
          url: '',
          parentUrl: '',
          leaf: false,
        }
      }
    },
    created () {
      console.log('home')
    },

    methods: {
      addListInfo() {
        this.dialogFormVisible = true
        this.listInfo = {
          name: '',
          url: '',
          parentUrl: '',
          leaf: false,
        }
      },
      submitListInfo() {
        this.$axios.post(this.$url + "/listInfo", this.listInfo)
          .then(rs => {
            if (rs.data.code === 0) {
              this.dialogFormVisible = false
            }
          })
      }
    }
  }
</script>
