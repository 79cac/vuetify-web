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
        v-model="dialogDelete"
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
            确认删除该任务吗？
          </v-card-text>
          <v-divider/>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              flat
              @click="deleteTask"
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
            <span class="headline">添加流量</span>
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
      <v-flex
        xs12
      >
        <material-card
          color="green"
          title="流量释放"
          text="Attack flow release"
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              sx12
              md7
            >
              <v-layout
                row
                wrap
              >
                <v-flex xs12/>
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
              md5
            >
              <v-layout row wrap>
                <v-flex
                  xs3
                >
                  <v-btn 
                    color="success"
                    @click="addFlow"
                  >
                    添加流量
                  </v-btn>
                </v-flex>
                <v-flex sx9>
                  <v-autocomplete
                    v-model="model"
                    :items="taskList"
                    label="选择任务"
                    persistent-hint
                    prepend-icon="mdi-clipboard-outline"
                    @input="isEditingTask = !isEditingTask"
                  >
                    <template v-slot:append-outer>
                      <v-slide-x-reverse-transition
                        mode="out-in"
                      >
                        <v-icon
                          :color="isEditingTask ? 'success' : 'info'"
                          @click="isEditingTask = !isEditingTask"
                          v-text="isEditingTask ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                        />
                      </v-slide-x-reverse-transition>
                      <v-icon @click="dialogDelete=true">mdi-close</v-icon>
                    </template>
                  </v-autocomplete>  
                </v-flex>

                <v-flex
                  sx12
                  md6
                >
                  <v-text-field label="源IP地址*" />
                </v-flex>
                <v-flex
                  sx12
                  md6
                >
                  <v-text-field label="目的IP地址*" />
                </v-flex>
                <v-flex
                  xs7
                >
                  <v-text-field
                    label="保存该任务"
                    v-model="taskName"
                  >
                    <template v-slot:append-outer>
                      <v-icon
                        @click="dialogSave = true"
                        v-text="'mdi-check-outline'"
                      />
                    </template>
                  </v-text-field>
                </v-flex>
                <v-flex
                  xs3
                  offset-xs1
                >
                  <v-btn
                    color="green"
                  >
                    任务发布
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
          color="green"
          title="任务列表"
          text="Tasks"
        >
          <v-data-table
            :headers="headersTask"
            :items="itemsTask"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.id }}</td>
              <td class="text-xs-left">{{ props.item.Name }}</td>
              <td class="text-xs-left">{{ props.item.Number }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex
        xs12
      >
        <material-card
          color="green"
          title="任务进度"
          text="Progress"
        >
          <v-data-table
            :headers="headersProgress"
            :items="itemsProgress"
            class="elevation-1"
          >
            <template v-slot:items="props">
            </template>
          </v-data-table>
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
      feedback: true,
      isEditingTask: false,
      taskName: null,
      model: null,
      flow: null,
      times: 1,
      editing: -1,
      taskList: [],
      flowList: [],
      items: [],
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
        { sortable: false, text: '任务序号', value: 'id'},
        { sortable: false, text: '源地址', value: 'srcIP'},
        { sortable: false, text: '目的地址', value: 'dstIP'},
        { sortable: false, text: '发布时间', value: 'starttime'},
        { sortable: false, text: '结束时间', value: 'endtime'},
        { sortable: false, text: '状态', value: 'status'},
        { sortable: false, text: '操作'}
      ],
      itemsTask: [],
      headersProgress: [
        {
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { sortable: false, text: '序列号', value: 'id'},
        { sortable: false, text: '名称', value: 'id'},
        { sortable: false, text: '次数', value: 'id'},
        { sortable: false, text: '进度', value: 'id'}
      ],
      itemsProgress: []
    }
  },
  methods: {
    addFlow: function () {
      length = 
      this.items.push({
        id: '1',
        flowName: this.flow,
        Number: this.times,
        isFeedback: this.feedback        
      })
      this.flow = null
      this.times = 1
    },
    saveTask: function () {
      this.dialogSave = false
    },
    deleteTask: function () {
      this.dialogDelete = false
    },
    addFlow: function () {
      this.editing = -1
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
        for (let i of res.data.data) {
          this.flowList.push(i[0])
        }
      }
    }).catch(res => {
      this.$notify.error('服务器错误')
    })

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
        for (let i of res.data.data) {
          this.TaskList.push(i[0])
        }
      }
    }).catch(res => {
      this.$notify.error('服务器错误')
    })
  }
}
</script>
