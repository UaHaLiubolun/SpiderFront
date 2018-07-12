<template>
  <div>
    <div>
      <el-button type="primary" @click="addInfo()">添加</el-button>
    </div>
    <div>
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
          label="是否正在运行"
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
          width="150"
          :formatter="timeForMatter">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="viewInfo(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog
        title="详细信息"
        :visible.sync="infoDialog"
        width="80%">
        <el-form ref="siteTask" :model="siteTask" >
          <el-form-item label="域名">
            <el-input :disabled="isModify" v-model="siteTask.site.domain"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <el-form-item label="线程数">
                <el-input v-model="siteTask.threadNum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="10">
              <el-form-item label="间隔">
                <el-input v-model="siteTask.interval"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="是否启用">
            <el-switch v-model="siteTask.on"></el-switch>
          </el-form-item>

          <el-collapse v-model="activeNames">
            <el-collapse-item title="域名信息" name="1">
              <el-form-item label="域名">
                <el-input :disabled="isModify" v-model="siteTask.site.domain"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="5">
                  <el-form-item label="睡眠(s)">
                    <el-input v-model="siteTask.site.sleepTime"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">
                  <el-form-item label="超时(s)">
                    <el-input v-model="siteTask.site.timeOut"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">
                  <el-form-item label="重试次数">
                    <el-input v-model="siteTask.site.retryTimes"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">&nbsp;</el-col>
                <el-col :span="5">
                  <el-form-item label="编码">
                    <el-input v-model="siteTask.site.charset"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>

            <el-collapse-item title="StartURL" name="2">
              <el-form-item
                v-for="(url, index) in startUrlTran"
                :label="'URL-' + index"
                :key="url.key"
                :prop="'startUrlTran.' + index + '.value'"
                :rules="{
      required: true, message: 'Url不能为空', trigger: 'blur'
    }"
              >
                <el-row>
                  <el-col :span="10">
                    <el-input v-model="url.value"></el-input>
                  </el-col>
                  <el-col :span="5">
                    &nbsp;
                  </el-col>
                  <el-col :span="3">
                    <el-button type="danger" @click.prevent="removeStartUrl(url)">删除</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addStartUrl">新增</el-button>
              </el-form-item>
            </el-collapse-item>
            <el-collapse-item title="PageModels" name="3">
              <el-row>
                <el-col :span="22" :offset="1">
                  <el-collapse v-model="activeCNames">
                    <el-collapse-item title="TargetUrl" name="31">
                      <el-form-item
                        v-for="(url, index) in targetUrlTran"
                        :label="'TargetURL-' + index"
                        :key="url.key"
                        :prop="'targetUrlTran.' + index + '.value'"
                        :rules="{
      required: true, message: 'Url不能为空', trigger: 'blur'
    }"
                      >
                        <el-row>
                          <el-col :span="10">
                            <el-input v-model="url.value"></el-input>
                          </el-col>
                          <el-col :span="5">
                            &nbsp;
                          </el-col>
                          <el-col :span="3">
                            <el-button type="danger" @click.prevent="removeTargetUrl(url)">删除</el-button>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="addTargetUrl">新增</el-button>
                      </el-form-item>
                    </el-collapse-item>

                    <el-collapse-item title="HelpUrl" name="32">
                      <el-form-item
                        v-for="(url, index) in helpUrlTran"
                        :label="'HelpURL-' + index"
                        :key="url.key"
                        :prop="'helpUrlTran.' + index + '.value'"
                        :rules="{
      required: true, message: 'Url不能为空', trigger: 'blur'
    }"
                      >
                        <el-row>
                          <el-col :span="10">
                            <el-input v-model="url.value"></el-input>
                          </el-col>
                          <el-col :span="5">
                            &nbsp;
                          </el-col>
                          <el-col :span="3">
                            <el-button type="danger" @click.prevent="removeHelpUrl(url)">删除</el-button>
                          </el-col>
                        </el-row>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="addHelpUrl">新增</el-button>
                      </el-form-item>
                    </el-collapse-item>

                    <el-collapse-item title="Extracts" name="33">
                      <el-form-item
                        v-for="(extract, index) in siteTask.pageModels[0].extracts"
                      >
                        <el-row>
                          <el-col :span="5">
                            <el-form-item label="字段">
                              <el-input v-model="extract.filed"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="4">
                            <el-form-item label="数据类型">
                              <el-select v-model="extract.source" placeholder="数据类型">
                                <el-option label="Html" value="Html"></el-option>
                                <el-option label="Json" value="Json"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="4">
                            <el-form-item label="解析方式">
                              <el-select v-model="extract.type" placeholder="解析方式">
                                <el-option label="Xpath" value="Xpath"></el-option>
                                <el-option label="Regex" value="Regex"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="2">
                            <el-form-item label="NotNull">
                              <el-switch v-model="extract.notNull"></el-switch>
                            </el-form-item>
                          </el-col>
                          <el-col :span="1">&nbsp;</el-col>
                          <el-col :span="2">
                            <el-form-item label="是否多项">
                              <el-switch v-model="extract.multi"></el-switch>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <h1></h1>
                        <lable>表达式</lable>
                        <el-form-item v-for="(va, i) in extract.value"
                        >
                          <el-row>
                            <el-col :span="10">
                              <el-input v-model="extract.value[i]"></el-input>
                            </el-col>
                            <el-col :span="6">&nbsp;</el-col>
                            <el-col :span="3">
                              <el-button type="primary" icon="el-icon-plus" v-if="i === 0" @click="addValue(index)"></el-button>
                              <el-button type="danger" icon="el-icon-delete" v-else @click="removeValue(index, va)"></el-button>
                            </el-col>
                          </el-row>
                          <h1></h1>
                        </el-form-item>
                        <h1></h1>
                        <el-button v-if="extract.dataConversion === undefined || extract.dataConversion === null"
                        type="primary" @click="openConversion(index)">使用处理函数</el-button>
                        <el-button v-else type="danger" @click="closeConversion(index)">关闭处理函数</el-button>
                        <el-row v-if="extract.dataConversion !== undefined && extract.dataConversion !== null">
                          <el-col :span="10">
                            <el-form-item label="函数名">
                              <el-input v-model="extract.dataConversion.function"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="2">&nbsp;</el-col>
                          <el-col :span="10">
                            <el-form-item label="参数">
                              <el-input v-model="extract.dataConversion.expression"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <h1></h1>
                        <el-button type="danger" @click.prevent="removeExtract(extract)">删除</el-button>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="addExtract">新增</el-button>
                      </el-form-item>
                    </el-collapse-item>
                  </el-collapse>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="submitData">保存</el-button>
          <el-button @click="infoDialog = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        infoDialog: false,
        action: "edit",
        isModify: false,
        activeNames: [],
        activeCNames: [],
        startUrlTran: [{
          value: "",
          key: new Date()
        }],
        targetUrlTran: [{
          value: "",
          key: new Date()
        }],
        helpUrlTran: [{
          value: "",
          key: new Date()
        }],
        siteTask: {
          site:{
            domain: "",
            userAgent: null,
            cookies: {},
            charset: "utf-8",
            sleepTime: 0,
            retryTimes: 0,
            cycleRetryTimes: 0,
            retrySleepTime: 1000,
            timeOut: 5000,
            acceptStatCode: [
              200
            ],
            headers: {},
          },
          startUrls: [],
          threadNum: 0,
          interval: 0,
          pageModels: [{
            targetUrl: [],
            helpUrl: [],
            extracts: [{
              filed: "",
              value: [],
              type: "",
              source: "",
              notNull: false,
              multi: false,
              dataConversion: {
                function: "",
                expression: ""
              }
            }]
          }],
          lastTime: 0,
          on: false,
          run: false
        },
        tableData: []
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
      },
      viewInfo(row) {
        this.infoDialog = true
        this.action = "edit"
        this.isModify = true
        this.siteTask = row
        this.startUrlTran = this.tranUrl(row.startUrls)
        this.targetUrlTran = this.tranUrl(row.pageModels[0].targetUrl)
        this.helpUrlTran = this.tranUrl(row.pageModels[0].helpUrl)
        console.log(row)
      },
      addInfo() {
        this.isModify = false
        this.action = "add"
        this.infoDialog = true
        this.siteTask = {
          site:{
            domain: "",
            userAgent: null,
            cookies: {},
            charset: "utf-8",
            sleepTime: 0,
            retryTimes: 0,
            cycleRetryTimes: 0,
            retrySleepTime: 1000,
            timeOut: 5000,
            acceptStatCode: [
              200
            ],
            headers: {},
          },
          startUrls: [],
          threadNum: 0,
          interval: 0,
          pageModels: [{
            targetUrl: [],
            helpUrl: [],
            extracts: [{
              filed: "",
              value: [""],
              type: "XPath",
              source: "Html",
              notNull: false,
              multi: false,
              dataConversion: null
            }]
          }],
          lastTime: 0,
          on: false,
          run: false
        }
        this.startUrlTran = []
        this.targetUrlTran = []
        this.helpUrlTran = []
      },
      submitData() {
        this.siteTask.startUrls = this.collectUrl(this.startUrlTran)
        this.siteTask.pageModels[0].targetUrl = this.collectUrl(this.targetUrlTran)
        this.siteTask.pageModels[0].helpUrl = this.collectUrl(this.helpUrlTran)
        if (this.action === "add") {
          this.$axios.post(this.$url + "/siteTask", this.siteTask)
            .then(res => {
              if (res.data.code === 0) {
                this.infoDialog = false
                this.showTeacherList()
              } else {
                alert("failed")
              }
            })
        } else if (this.action === "edit") {
          this.$axios.put(this.$url + "/siteTask", this.siteTask)
            .then(res => {
              if (res.data.code === 0) {
                this.infoDialog = false
                this.showTeacherList()
              } else {
                alert("failed")
              }
            })
        }
      },
      addStartUrl() {
        this.startUrlTran.push({
          value: "",
          key: new Date()
        })
      },
      removeStartUrl(url) {
        var index = this.startUrlTran.indexOf(url)
        if (index !== -1) {
          this.startUrlTran.splice(index, 1)
        }
      },
      addHelpUrl() {
        this.helpUrlTran.push({
          value: "",
          key: new Date()
        })
      },
      removeHelpUrl(url) {
        var index = this.helpUrlTran.indexOf(url)
        if (index !== -1) {
          this.helpUrlTran.splice(index, 1)
        }
      },
      addTargetUrl() {
        this.targetUrlTran.push({
          value: "",
          key: new Date()
        })
      },
      removeTargetUrl(url) {
        var index = this.targetUrlTran.indexOf(url)
        if (index !== -1) {
          this.targetUrlTran.splice(index, 1)
        }
      },
      addExtract() {
        this.siteTask.pageModels[0].extracts.push({
          filed: "",
          value: [""],
          type: "Xpath",
          source: "Html",
          notNull: false,
          multi: false,
          dataConversion: null
        })
      },
      removeExtract(url) {
        var index = this.siteTask.pageModels[0].extracts.indexOf(url)
        if (index !== -1) {
          this.siteTask.pageModels[0].extracts.splice(index, 1)
        }
      },
      addValue(index) {
        this.siteTask.pageModels[0].extracts[index].value.push("")
      },
      removeValue(index, value) {
        var i = this.siteTask.pageModels[0].extracts[index].value.indexOf(value)
        if (i !== -1) {
          this.siteTask.pageModels[0].extracts[index].value.splice(i, 1)
        }
      },
      openConversion(index) {
        this.siteTask.pageModels[0].extracts[index].dataConversion = {
          function: "",
          expression: ""
        }
      },
      closeConversion(index) {
        this.siteTask.pageModels[0].extracts[index].dataConversion = null
      },
      collectUrl(urlTran) {
        var urls = []
        for (var i in urlTran) {
          urls.push(urlTran[i].value)
        }
        return urls
      },
      tranUrl(urls) {
        var urlTran = []
        for (var i in urls) {
          urlTran.push({
            value: urls[i],
            key: Date.now()
          })
        }
        return urlTran
      }
    }
  }
</script>
