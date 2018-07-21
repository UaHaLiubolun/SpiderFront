<template>
 <div>
   <div>
     <el-form ref="siteTask" :model="siteTask">
       <el-form-item label="URL">
         <el-input :disabled="isModify" v-model="siteTask.url"></el-input>
       </el-form-item>
       <el-row>
         <el-col :span="4">
           <el-form-item label="间隔">
             <el-input v-model="siteTask.interval"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="2">&nbsp;</el-col>
         <el-col :span="4">
           <el-form-item label="编码">
             <el-input v-model="siteTask.charset"></el-input>
           </el-form-item>
         </el-col>
         <el-col :span="2">&nbsp;</el-col>
         <el-col :span="2">
           <el-form-item label="是否启用">
             <el-switch v-model="siteTask.on"></el-switch>
           </el-form-item>
         </el-col>
       </el-row>
       <el-form-item
         v-for="(url, index) in targetUrlTran"
         :label="'目标URL-' + index"
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
         <el-button type="primary" @click="addTargetUrl">新增目标URL</el-button>
       </el-form-item>
       <h1></h1>
       <el-form-item
         v-for="(url, index) in helpUrlTran"
         :label="'二级URL-' + index"
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
         <el-button type="primary" @click="addHelpUrl">新增二级URL</el-button>
       </el-form-item>
       <h1></h1>
       <h1></h1>
       <el-form-item label="PageModel模板:">
         <el-select v-model="pageModelName" >
           <el-option v-for="pageModelM in pageModelModule" :key="pageModelM.name" :label="pageModelM.name" :value="pageModelM.name"></el-option>
         </el-select>
         <el-button type="primary" @click="useModule">使用模板</el-button>
       </el-form-item>
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
           <el-col :span="1">
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
         <el-button type="primary" @click="addExtract">新增字段</el-button>
       </el-form-item>
     </el-form>
     <h1></h1>
     <el-button @click="submitData">保存</el-button>
     &nbsp;
     <el-button @click="infoDialog = true">保存PageModel到模板</el-button>
   </div>
   <div>
     <el-dialog
     title="模板名称"
     :visible.sync="infoDialog"
     width="50%">
       <el-form>
         <el-form-item label="模板名称">
           <el-input v-model="moduleName"></el-input>
         </el-form-item>
       </el-form>
       <span class="dialog-footer">
          <el-button @click="savePageMode">保存</el-button>
          <el-button @click="infoDialog = false">取 消</el-button>
        </span>
     </el-dialog>
   </div>
 </div>
</template>

<script>
  export default {
    name: "ListInfo",
    data() {
      return {
        pageModelName: "",
        pageModelModule: [
          {
            name: "",
            pageModel: {

            }
          }
        ],
        infoDialog: false,
        moduleName: '',
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
          url: '',
          interval: 0,
          site:{
            domain: ''
          },
          type: '',
          source: '',
          spiderType: 'ListSpider',
          charset: 'utf-8',
          pageModels: [{
            targetUrl: [],
            helpUrl: [],
            extracts: [{
              filed: "",
              value: [""],
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
        },
      }
    },
    created() {
      this.$axios.get(this.$url + "/siteTask/urlMd5?urlMd5=" + this.getUrlMd5())
        .then(rs => {
          if (rs.data.code === 0) {
            if (rs.data.result.id === null) {
              this.siteTask = {
                interval: 3600,
                site: {
                  domain: ''
                },
                type: 'ListSpider',
                pageModels: [{
                  targetUrl: [],
                  helpUrl: [],
                  extracts: [{
                    filed: "subject",
                    value: [""],
                    type: "XPath",
                    source: "Html",
                    notNull: false,
                    multi: false,
                    dataConversion: null
                  },{
                    filed: "description",
                    value: [""],
                    type: "XPath",
                    source: "Html",
                    notNull: false,
                    multi: false,
                    dataConversion: null
                  },{
                    filed: "pubTime",
                    value: [""],
                    type: "XPath",
                    source: "Html",
                    notNull: false,
                    multi: false,
                    dataConversion: {
                      function: "fmtDate",
                      expression: "yyyy-MM-dd HH:mm:ss"
                    }
                  },{
                    filed: "parentSource",
                    value: [""],
                    type: "XPath",
                    source: "Html",
                    notNull: false,
                    multi: false,
                    dataConversion: null
                  },{
                    filed: "tbNickName",
                    value: [""],
                    type: "XPath",
                    source: "Html",
                    notNull: false,
                    multi: false,
                    dataConversion: null
                  },{
                    filed: "pics",
                    value: [""],
                    type: "XPath",
                    source: "Html",
                    notNull: false,
                    multi: true,
                    dataConversion: null
                  }]
                }],
                lastTime: 0,
                on: false,
                run: false
              }
              this.siteTask.url = rs.data.result.url
              this.targetUrlTran = []
              this.helpUrlTran = []
              this.action = "add"
              this.siteTask.site = rs.data.result.site
              this.isModify = true
            } else {
              this.siteTask = rs.data.result
              this.action = "edit"
              this.isModify = true
              this.targetUrlTran = this.tranUrl(this.siteTask.pageModels[0].targetUrl)
              this.helpUrlTran = this.tranUrl(this.siteTask.pageModels[0].helpUrl)
            }
            this.siteTask.type = rs.data.result.type
            this.siteTask.source = rs.data.result.source
          }
        })
      this.$axios.get(this.$url + "/pageModel/all")
        .then(rs => {
          if (rs.data.code === 0) {
            this.pageModelModule = rs.data.result
          }
        })
      this.urlMd5 = this.getUrlMd5()
    },
    methods: {
      getUrlMd5() {
        return this.$route.path.split("/")[2];
      },
      submitData() {
        this.siteTask.pageModels[0].targetUrl = this.collectUrl(this.targetUrlTran)
        this.siteTask.pageModels[0].helpUrl = this.collectUrl(this.helpUrlTran)
        this.siteTask.spiderType = 'ListSpider'
        if (this.action === "add") {
          this.$axios.post(this.$url + "/siteTask", this.siteTask)
            .then(res => {
              if (res.data.code === 0) {
                alert("success")
              } else {
                alert("failed")
              }
            })
        } else if (this.action === "edit") {
          this.$axios.put(this.$url + "/siteTask/modify/url", this.siteTask)
            .then(res => {
              if (res.data.code === 0) {
                alert("success")
              } else {
                alert("failed")
              }
            })
        }
      },
      useModule() {
        for (var i in this.pageModelModule) {
          if (this.pageModelModule[i].name === this.pageModelName) {
            this.siteTask.pageModels[0].extracts = this.pageModelModule[i].pageModel.extracts
            break
          }
        }
      },
      savePageMode() {
        this.siteTask.pageModels[0].targetUrl = this.collectUrl(this.targetUrlTran)
        this.siteTask.pageModels[0].helpUrl = this.collectUrl(this.helpUrlTran)
        this.$axios.post(this.$url + "/pageModel",
          {
            name: this.moduleName,
            pageModel: this.siteTask.pageModels[0]
          }).then(rs => {
            if (rs.data.code === 0) {
              this.infoDialog = false
            } else {
              alert("failed")
            }
        })
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
