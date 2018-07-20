<template>
  <div>
    <div id="home">
      <el-container style="height: 100vh">
        <el-aside width="20%" height="100%">
          <x-nav class="nav"></x-nav>
        </el-aside>
        <el-container>
          <el-header>
            <el-button @click="addListInfo()">添加</el-button>
          </el-header>
          <el-main>
            <router-view :key="key" class="content"></router-view>
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
          <el-form-item label="来源" :label-width="formLabelWidth">
            <template>
              <el-select v-model="listInfo.source" filterable placeholder="请选择(可搜索)">
                <el-option
                  v-for="item in sources"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item label="分类" :label-width="formLabelWidth">
            <template>
              <el-select v-model="listInfo.type" filterable placeholder="请选择(可搜索)">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>          </el-form-item>
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
        sources: [
          {
            value: 'News'
          },
          {
            value: 'Weibo'
          },
          {
            value: 'WeiXin'
          },
          {
            value: 'Government'
          },
          {
            value: 'LunTan'
          },
          {
            value: 'Video'
          },
          {
            value: 'TieBa'
          },
          {
            value: 'Other'
          },
        ],
        types: [
          {
            value: '体育'
          },
          {
            value: '教育'
          },
          {
            value: '财经'
          },
          {
            value: '社会'
          },
          {
            value: '娱乐'
          },
          {
            value: '军事'
          },
          {
            value: '国内'
          },
          {
            value: '科技'
          },
          {
            value: '互联网'
          },
          {
            value: '房产'
          },
          {
            value: '国际'
          },
          {
            value: '女人'
          },
          {
            value: '汽车'
          },
          {
            value: '游戏'
          },
        ],
        formLabelWidth: '120px',
        dialogFormVisible: false,
        options: [],
        urls: [],
        props: {
          label: 'name',
          value: 'url',
          children: 'children',
          disabled: 'leaf'
        },
        listInfo: {
          name: '',
          url: '',
          source: '',
          type: '',
        }
      }
    },
    created () {

    },

    computed: {
      key() {
        return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
      }
    },

    methods: {
      addListInfo() {
        this.dialogFormVisible = true
        this.listInfo = {
          name: '',
          url: '',
          source: '',
          type: '',
        }
      },
      submitListInfo() {
        this.listInfo.parentUrl = this.urls[this.urls.length - 1]
        this.$axios.post(this.$url + "/newsList", this.listInfo)
          .then(rs => {
            if (rs.data.code === 0) {
              this.dialogFormVisible = false
              location.reload();
            }
          })
      }
    }
  }
</script>
