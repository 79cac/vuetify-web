<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="dark"
          title="模板查询"
          text="Search template"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md2
                >
                  <v-text-field
                    label="攻击名称"
                    v-model="attackName"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md2
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="green"
                    @click="searchByName"
                  >
                    查询
                  </v-btn>
                </v-flex>
                <v-flex
                  xs12
                  md2
                >
                  <v-text-field
                    label="攻击ID"
                    v-model="attackID"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md2
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="green darken-1"
                    @click="searchById"
                  >
                    查询
                  </v-btn>
                </v-flex>
                <v-flex
                  xs12
                  md2
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="green darken-1"
                    @click="listAll"
                  >
                    展示流量模板
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
        <material-card
          color="dark"
          title="流量模板"
          text="Template list"
        >
          <v-data-table
            :headers="header1"
            :items="item1"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td class="text-xs-left">{{ item.attackID }}</td>
              <td class="text-xs-left">{{ item.attackName }}</td>
              <td class="text-xs-left">{{ item.targetInfo }}</td>
              <td class="text-xs-left">{{ item.proto }}</td>
              <td class="text-xs-left">{{ item.srcIP }}</td>
              <td class="text-xs-left">{{ item.dstIP }}</td>
              <td class="text-xs-center">
                <v-btn
                  flat
                  color="green darken-1"
                  @click="showDetails(item.attackID)"
                >
                  查看
                </v-btn>
                <v-btn
                  flat
                  color="green darken-1"
                  @click="xml(item.attackID)"
                >
                  导出
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex
        md12
      >
        <material-card
          color="dark"
          title="详细信息"
          text="Details"
        >
          <v-data-table
            :headers="header2"
            :items="item2"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td class="text-xs-left">{{ item.pktNum }}</td>
              <td class="text-xs-left">{{ item.pktTime }}</td>
              <td class="text-xs-left">{{ item.srcIP }}</td>
              <td class="text-xs-left">{{ item.dstIP }}</td>
              <td class="text-xs-left">{{ item.srcPort }}</td>
              <td class="text-xs-left">{{ item.dstPort }}</td>
              <td class="text-xs-left">{{ item.proto }}</td>
              <td class="text-xs-left">{{ item.payload }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-dialog v-model="dialog" width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">XML导出文档</span>
          </v-card-title>
          <v-card-text>
            {{text}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="dialog = false">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    pcapFile: null,
    name: null,
    srcIP: null,
    dstIP: null,
    proto: null,
    attackPlat: null,
    serverPlat: null,
    attackID: null,
    attackName: null,
    text: null,
    header1: [
      {
        sortable: false,
        text: '攻击标识ID',
        value: 'attackID'
      },
      {
        sortable: false,
        text: '攻击名称',
        value: 'attackName'
      },
      {
        sortable: false,
        text: '目标环境',
        value: 'targetInfo'
      },
      {
        sortable: false,
        text: '协议类型',
        value: 'proto'
      },
      {
        sortable: false,
        text: '攻击地址',
        value: 'srcIP'
      },
      {
        sortable: false,
        text: '靶机地址',
        value: 'dstIP'
      },
      {
        sortable: false,
        text: '操作',
        value: 'option',
        align: 'justify-center'
      }
    ],
    header2: [
      {
        sortable: false,
        text: '包序列号',
        value: 'pktNum'
      },
      {
        sortable: false,
        text: '时间间隔',
        value: 'pktTime'
      },
      {
        sortable: false,
        text: '源地址IP',
        value: 'srcIP'
      },
      {
        sortable: false,
        text: '目的地址IP',
        value: 'dstIP'
      },
      {
        sortable: false,
        text: '源端口',
        value: 'srcPort'
      },
      {
        sortable: false,
        text: '目的端口',
        value: 'dstPort'
      },
      {
        sortable: false,
        text: '协议类型',
        value: 'proto'
      },
      {
        sortable: false,
        text: '数据包信息',
        value: 'payload'
      }
    ],
    item1: [
    ],
    item2: []
  }),
  methods: {
    listAll: function() {
      this.$http({
        method: 'POST',
        url: '/listAll'
      }).then(res => {
        if (res.data.status === 'log') {
          this.$router.push('/logIn')
          this.$notify.warn('请先登入')
          return 
        }
        if (res.data.status === 'OK') {
          this.$notify.success('查询成功')
          this.item1 = []
          for (let i of res.data.data) {
            this.item1.push({
              attackID: i[0],
              attackName: i[1],
              platInfo: i[2],
              targetInfo: i[3],
              proto: i[4],
              srcIP: i[5],
              dstIP: i[6]             
            })
          }
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    },
    showDetails: function(attackID) {
      console.log(attackID)
      this.$http({
        method: 'POST',
        url: '/showDetails',
        data: {
          attackID: attackID
        }
      }).then(res => {
        if (res.data.status === 'log') {
          this.$router.push('/logIn')
          this.$notify.warn('请先登入')
          return 
        }
        if (res.data.status === 'OK') {
          this.$notify.success('查询成功')
          this.item2 = []
          for (let i of res.data.data) {
            let delta_time = ''
            if (i[1] > 0 && i[1] < 1000)
              delta_time = i[1] + '秒' + i[2] + '微秒'
            else if (i[1] == 0)
              delta_time = i[2] + '微秒'
            this.item2.push({
              pktNum: i[0],
              pktTime: delta_time,
              srcIP: i[3],
              dstIP: i[4],
              srcPort: i[5],
              dstPort: i[6],
              proto: i[7],
              payload: i[8]
            })          
          }
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    },
    searchById: function() {
      this.$http({
        method: 'POST',
        url: '/searchById',
        data: {
          attackID: this.attackID
        }
      }).then(res => {
        if (res.data.status === 'log') {
          this.$router.push('/logIn')
          this.$notify.warn('请先登入')
          return 
        }
        if (res.data.status === 'OK') {
          this.$notify.success('查询成功')
          this.item1 = []
          for (let i of res.data.data) {
            this.item1.push({
              attackID: i[0],
              attackName: i[1],
              platInfo: i[2],
              targetInfo: i[3],
              proto: i[4],
              srcIP: i[5],
              dstIP: i[6]             
            })
          }
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    },
    searchByName: function() {
      this.$http({
        method: 'POST',
        url: '/searchByName',
        data: {
          attackName: this.attackName
        }
      }).then(res => {
        if (res.data.status === 'log') {
          this.$router.push('/logIn')
          this.$notify.warn('请先登入')
          return 
        }
        if (res.data.status === 'OK') {
          this.$notify.success('查询成功')
          this.item1 = []
          for (let i of res.data.data) {
            this.item1.push({
              attackID: i[0],
              attackName: i[1],
              platInfo: i[2],
              targetInfo: i[3],
              proto: i[4],
              srcIP: i[5],
              dstIP: i[6]             
            })
          }
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    },
    xml: function(attackID) {
      this.$http({
        method: 'POST',
        url: '/xml',
        data: {
          attackID: attackID
        }
      }).then(res => {
        if (res.data.status === 'log') {
          this.$router.push('/logIn')
          this.$notify.warn('请先登入')
          return 
        }
        if (res.data.status === 'OK') {
          this.text = res.data.data
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
      this.dialog = true
    }
  }
}
</script>
