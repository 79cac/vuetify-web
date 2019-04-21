<template>
  <v-container
    fill-height
    fluid
    grid-list-md
  >
    <v-layout
      row
      wrap
    >        
      <v-dialog
        v-model="dialogSave"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            提示
          </v-card-title>
          <v-card-text>
            确认保存该任务吗？
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              flat
              @click="saveTask"
            >
              确认
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog 
        v-model="dialogAdd"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{dialogHead}}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex
                  sx12
                  md10
                >
                  <v-autocomplete
                    v-model="flow"
                    :items="flowList"
                    label="选择流量"
                    persistent-hint
                    prepend-icon="mdi-clipboard-outline"               
                  >
                  </v-autocomplete>
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-text-field
                    label="重复次数"
                    v-model="times"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-checkbox
                  label="反馈模式"
                  v-model="feedback"
                  />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue darken-1" flat @click="dialogAdd = false">关闭</v-btn>
            <v-btn color="blue darken-1" flat @click="flowCommit">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog 
        v-model="dialogProgress"
        persistent
        max-width="80%"
      >
        <v-card>
          <v-card-title>
            <span class="headline">释放进度</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex
                  xs8
                >

                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue darken-1" flat @click="dialogProgress = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex
        xs12
      >
        <material-card
          color="dark"
          title="攻击流量释放"
          text="Attack flow release"
        >
          <v-layout
            row
            wrap
          >
            <v-flex sx4>
              <v-autocomplete
                v-model="choosedTask"
                :items="taskList"
                label="选择任务"
                persistent-hint
                prepend-icon="mdi-clipboard-outline"
              >
              </v-autocomplete>  
            </v-flex>
            <v-flex xs2>
              <v-btn color="green" @click="loadTask">选择</v-btn>
            </v-flex>
            <v-flex
              xs4
            >
              <v-text-field
                label="输入任务名称"
                v-model="taskName"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-btn color="green" @click="dialogSave = true">保存</v-btn>
            </v-flex>
            <v-flex xs9>          
              <v-layout
                row
                wrap
              >
                <v-flex
                  xs12
                >
                  <v-data-table
                    :headers="headers"
                    :items="items"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <td>{{ props.item.name }}</td>
                      <td class="text-xs-left">{{ props.item.flowName }}</td>
                      <td class="text-xs-left">{{ props.item.Number }}</td>
                      <td class="text-xs-left">
                        {{props.item.isFeedback}}
                      </td>
                      <td class="justify-center">
                        <v-icon @click="editItem(props.item)">mdi-table-edit</v-icon>
                        <v-icon @click="deleteItem(props.item)">mdi-delete</v-icon>
                      </td>
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex
              xs12
              md3
            >
              <v-btn 
                color="success"
                @click="addFlow"
              >
                添加模板
              </v-btn>
            </v-flex>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex
                  sx12
                  md4
                >
                  <v-autocomplete
                    v-model="srcIP"
                    :items="IP"
                    label="源IP地址"
                    persistent-hint
                  >
                  </v-autocomplete> 
                </v-flex>
                <v-flex
                  sx12
                  md4
                >
                  <v-autocomplete
                    v-model="dstIP"
                    :items="IP"
                    label="目的IP地址"
                    persistent-hint
                  >
                  </v-autocomplete>
                </v-flex>

                <v-flex
                  xs3
                  offset-xs1
                >
                  <v-btn
                    color="green"
                    @click="publish"
                  >
                    发布任务
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </material-card>
      </v-flex>
      <v-flex
        xs12
      >
        <material-card
          color="dark"
          title="任务列表"
          text="Job list"
        >
          <v-data-table
            :headers="headersTask"
            :items="itemsTask"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.taskName }}</td>
              <td class="text-xs-left">{{ props.item.srcIP }}</td>
              <td class="text-xs-left">{{ props.item.dstIP }}</td>
              <td class="text-xs-left">{{ props.item.starttime }}</td>
              <td class="text-xs-left">{{ props.item.endtime }}</td>
              <td class="text-xs-left">{{ props.item.status }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex
        xs12
      >
        <material-card
          color="dark"
          title="任务进度"
          text="Job progress"
        >
          <v-layout row wrap>
            <v-flex xs8>
              <ve-line :data="bytePerSec" ></ve-line>
            </v-flex>
            <v-flex xs4>
              <v-layout align-center fill-height row justify-center>
                <v-flex>
                  释放进度：{{percentage}}%
                </v-flex>
                <v-flex>
                  正在发送：{{attackName}}
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>          
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* eslint-disable */
export default {
  data () {
    return {
      dialogSave: false,
      dialogDelete: false,
      dialogAdd: false,
      dialogProgress:false,
      dialogHead: '',
      feedback: true,
      taskName: null,
      choosedTask: null,
      model: null,
      flow: null,
      times: 1,
      editing: -1,
      taskList: [],
      flowList: [],
      items: [],
      srcIP: '',
      dstIP: '',
      IP: [],
      percentage: 0,
      attackName: '',
      bytePerSec: {
        columns: ['time', '每秒发送的字节数'],
        rows: []
      },
      // packagePerSec: {
      //   rows: []
      // },
      headers: [
        {
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { sortable: false, text: '名称', value: 'flowName' },
        { sortable: false, text: '次数', value: 'Number' },
        { sortable: false, text: '反馈模式'},
        { sortable: false, text: '操作'}     
      ],
      headersTask: [
        {
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { sortable: false, text: '任务名称', value: 'taskName'},
        { sortable: false, text: '源地址', value: 'srcIP'},
        { sortable: false, text: '目的地址', value: 'dstIP'},
        { sortable: false, text: '发布时间', value: 'starttime'},
        { sortable: false, text: '结束时间', value: 'endtime'},
        { sortable: false, text: '状态', value: 'status'}
      ],
      itemsTask: []
    }
  },
  methods: {
    saveTask: function () {
      this.dialogSave = false
      let attackInfo = []
      for(let i of this.items) {
        attackInfo.push({
          flowName: i.flowName,
          Number: i.Number,
          isFeedback: (i.isFeedback === '是')? 1:0          
        })
      }
      this.$http({
        method: 'POST',
        url: '/addTask',
        data: {
          taskName: this.taskName,
          attackInfo: attackInfo
        }
      }).then(res => {
        if (res.data.status === 'log') {
          this.$notify.warn('请先登入')
          this.$router.push('/logIn')
          return
        }
        if (res.data.status === 'OK') {
          this.taskName = null
          this.$notify.success('保存任务成功')
          this.getTaskList()
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    },
    addFlow: function () {
      this.editing = -1
      this.dialogHead = '添加流量模板'
      this.dialogAdd = true
    },
    flowCommit: function() {
      this.dialogAdd = false
      if (this.editing === -1) {
        this.items.push({
          flowName: this.flow,
          Number: this.times,
          isFeedback: this.feedback? '是':'否'
        })        
      }
      else {
        this.items[this.editing].flowName = this.flow
        this.items[this.editing].Number = this.times
        this.items[this.editing].isFeedback = this.feedback? '是':'否'
      }
    },
    editItem: function(item) {
      this.dialogHead = '编辑流量模板'
      this.dialogAdd = true
      this.editing = this.items.indexOf(item)
      this.flow = item.flowName
      this.times = item.Number
      if (item.isFeedback === '是')
        this.feedback = true 
      else
        this.feedback = false
    },
    deleteItem: function(item) {
      const index = this.items.indexOf(item)
      this.items.splice(index,1)
    },
    getTaskList: function () {
      this.$http({
        method: 'POST',
        url: '/getTaskList'
      }).then(res => {
        if (res.data.status === 'log') {
          this.$notify.warn('请先登入')
          this.$router.push('/logIn')
          return
        }
        if (res.data.status === 'OK') {
          this.taskList = []
          for (let i of res.data.data) {
            this.taskList.push(i[0])
          }
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    },
    loadTask: function() {
      this.$http({
        method: 'POST',
        url: '/loadTask',
        data: {
          taskName: this.choosedTask
        }
      }).then(res => {
        if (res.data.status === 'log') {
          this.$notify.warn('请先登入')
          this.$router.push('/logIn')
          return
        }
        if (res.data.status === 'OK') {
          this.items = []
          for (let i of res.data.data) {
            this.items.push({
              flowName: i[0],
              Number: i[1],
              isFeedback: (i[2] === 1)? '是':'否'
            })
          }
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })      
    },
    publish: function() {
      //check
      if (this.srcIP === '' || this.dstIP === '') {
        this.$notify.warn('请输入源地址和目的地址')
        return
      }
      let attackInfo = []
      for(let i of this.items) {
        attackInfo.push({
          flowName: i.flowName,
          Number: i.Number,
          isFeedback: (i.isFeedback === '是')? 1:0          
        })
      }
      let time = new Date()
      this.$http({
        method: 'POST',
        url: '/publish',
        data: {
          starttime: time.getTime(),
          srcIP: this.srcIP,
          dstIP: this.dstIP,
          attackInfo: attackInfo
        }
      }).then(res => {
        if (res.data.status === 'log') {
          this.$notify.warn('请先登入')
          this.$router.push('/logIn')
          return
        }
        if (res.data.status === 'OK') {
          this.$notify.success('任务发布成功')
          this.getReleaseInfo()
          this.startRelease()
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    },
    startRelease: function() {
      let socket = new WebSocket("ws://192.168.233.150:1338");
      socket.onopen = function(evt) { 
        console.log("Connection open ..."); 
        socket.send("Ins:Hello WebSockets!");
      };
      let dat = this
      let starttime = 0
      let packageNum = 0
      let byte = 0
      let times = 0
      dat.bytePerSec.rows = []
      socket.onmessage = function(event) {
        //console.log(event.data)
        if (event.data.startsWith('Register success')) {
          if (dat.attackName !== event.data.split('!')[1]) {
            dat.attackName = event.data.split('!')[1]
            dat.percentage = 0
            times = 0
          }
          else {
            times += 1
          }
          console.log(times)             
          return     
        }
        if (event.data.startsWith('Finished')) { 
          let taskName = event.data.split(':')[1]
          dat.finishRelease(taskName)
          return
        }
        //计算进度
        dat.percentage = 0
        let packageInfo = event.data.split(',')[0]
        let number = parseFloat(packageInfo.split('-')[2])
        let total = parseFloat(packageInfo.split('-')[1])
        let current = parseFloat(packageInfo.split('-')[0]) + times * total
        dat.percentage = parseInt(100 * (current / total) / number)
        //console.log(dat.percentage)
        // 绘图
        let time = parseFloat(event.data.split(',')[4])
        let bytes = parseInt(event.data.split(',')[1])
        let interval = 1
        if (starttime == 0) {
          starttime = time
          //packageNum++
          byte += bytes
        }
        else if (time - starttime < interval) {
          //packageNum++
          byte += bytes
        }
        else {
          //dat.packagePerSec.rows.push({'time':dat.packagePerSec.rows.length * interval,'数据包的数量':packageNum})
          dat.bytePerSec.rows.push({'time':dat.bytePerSec.rows.length * interval,'每秒发送的字节数':byte})
          //console.log(dat.packagePerSec.rows)
          starttime = time
          //packageNum = 1
          byte = bytes
        }
        if (dat.progress == 100.0) {
          //dat.packagePerSec.rows.push({'time':dat.packagePerSec.rows.length * interval,'数据包的数量':packageNum})
          dat.bytePerSec.rows.push({'time':dat.bytePerSec.rows.length * interval,'每秒发送的字节数':byte})
          starttime = 0
          //packageNum = 0
          byte = 0
        }
      }
    },
    finishRelease: function(taskName) {
      let time = new Date()
      this.$http({
        method: 'POST',
        url: '/finishRelease',
        data: {
          endtime: time.getTime(),
          taskName: taskName
        }
      }).then(res => {
        if (res.data.status === 'OK') {
          if (res.data.status === 'log') {
            this.$router.push('/logIn')
            this.$notify.warn('请先登入')
            return 
          }
          this.$notify.success('释放完毕')
          this.getReleaseInfo()
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    },
    getReleaseInfo: function() {
      this.$http({
        method: 'POST',
        url: '/getReleaseInfo',
      }).then(res => {
        if (res.data.status === 'OK') {
          if (res.data.status === 'log') {
            this.$router.push('/logIn')
            this.$notify.warn('请先登入')
            return 
          }
          this.itemsTask = []
          for (let i of res.data.data) {
            this.itemsTask.push({
              taskName: i[0],
              srcIP: i[1],
              dstIP: i[2],
              starttime: this.toTime(i[3]),
              endtime: this.toTime(i[4]),
              status: (i[5] === 0) ? "正在发送" : "已发送"      
            })
          }
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    },
    toTime: function(data) {
      let time = new Date()
      if (data === -1 || data === '-1') {
        return '--'
      }
      else {
        time.setTime(data)
        time = time.toString().split('(')[0]
        return time
      }
    },
    getDevicesInfo: function() {
      this.$http({
        method: 'POST',
        url: '/getDevicesInfo',
      }).then(res => {
        if (res.data.status === 'OK') {
          if (res.data.status === 'log') {
            this.$router.push('/logIn')
            this.$notify.warn('请先登入')
            return 
          }
          this.IP = []
          for (let i of res.data.data) {
            this.IP.push(i[0])
          }
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })      
    }
  },
  mounted () {
    this.flowList = []
    this.$http({
      method: 'POST',
      url: '/getFlowList'
    }).then(res => {
      if (res.data.status === 'log') {
        this.$notify.warn('请先登入')
        this.$router.push('/logIn')
        return
      }
      if (res.data.status === 'OK') {
        this.flowList = []
        for (let i of res.data.data) {
          this.flowList.push(i[0])
        }
      }
    }).catch(res => {
      this.$notify.error('服务器错误')
    })

    this.getTaskList()
    this.getReleaseInfo()
    this.getDevicesInfo()
  }
}
</script>
