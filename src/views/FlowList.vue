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
          color="green"
          title="流量查询"
          text="Search attack flow"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                  md3
                >
                  <v-text-field
                    label="攻击名称"
                    v-model="attackName"
                  />
                </v-flex>
                <v-flex
                  xs12
                  md3
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
                    color="green"
                    @click="search"
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
                    color="green"
                    @click="listAll"
                  >
                    展示所有流量
                  </v-btn>
                </v-flex>
                <v-flex
                  xs12
                  md2
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="green"
                    @click="load"
                  >
                    导入新流量
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
        <material-card
          color="green"
          title="流量列表"
          text="Flow list"
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
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.attackID }}</td>
              <td>{{ item.attackName }}</td>
              <td>{{ item.platInfo }}</td>
              <td>{{ item.targetInfo }}</td>
              <td>{{ item.proto }}</td>
              <td>{{ item.srcIP }}</td>
              <td>{{ item.dstIP }}</td>
              <td>{{ item.tsType }}</td>
              <td>
                <v-btn 
                  color="success" 
                  @click="showDetails(item.row)"
                >
                  查看
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
          color="green"
          flat
          full-width
          title="流量详细信息"
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
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    attackID: null,
    attackName: null,
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
        text: '攻击环境',
        value: 'platInfo'
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
        align: 'right'
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
        text: '时间',
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
        if (res.data.status === 'OK') {
          this.$notify.success('查询成功')
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    }
  }
}
</script>
