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
                <v-flex
                  xs7
                >
                  <v-autocomplete
                    v-model="model"
                    :items="states"
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
                      <v-icon @click="">mdi-close</v-icon>
                    </template>
                  </v-autocomplete>   
                </v-flex>
                <v-flex
                  xs5
                >
                  <v-text-field
                    label="保存该任务"
                    v-model="taskName"
                  >
                    <template v-slot:append-outer>
                      <v-icon
                        @click=""
                        v-text="'mdi-check-outline'"
                      />
                    </template>
                  </v-text-field>
                </v-flex>
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
                      <td class="text-xs-left">{{ props.item.id }}</td>
                      <td class="text-xs-left">{{ props.item.Name }}</td>
                      <td class="text-xs-left">{{ props.item.Number }}</td>
                      <td class="text-xs-left">
                        <v-icon>mdi-arrow-up</v-icon>
                        <v-icon>mdi-arrow-down</v-icon>
                        <v-icon>mdi-close</v-icon>
                      </td>
                      <td class="text-xs-left">
                        {{props.item.isFeedback}}
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
                  sx12
                  md8
                >
                  <v-autocomplete
                    v-model="model"
                    :items="states"
                    label="选择流量"
                    persistent-hint
                    prepend-icon="mdi-clipboard-outline"
                    @input="isEditing = !isEditing"
                  >
                  </v-autocomplete>
                </v-flex>
                <v-flex
                  xs12
                  md3
                >
                  <v-text-field
                    label="重复次数"
                  />
                </v-flex>
                <v-flex
                  sx12
                  md6
                >
                  <v-text-field label="源IP地址"/>
                </v-flex>
                <v-flex
                  sx12
                  md6
                >
                  <v-text-field label="目的IP地址"/>
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
                <v-flex xs3>
                  <v-btn color="success">
                    添加流量
                  </v-btn>
                </v-flex>
                <v-flex
                  offset-xs6
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
      feedback: true,
      isEditingTask: false,
      model: null,
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ],
      items: [
        {
          id: '1',
          Name: '123123123123',
          Number: '1',
          isFeedback: '是'
        },
        {
          id: '2',
          Name: '124',
          Number: '1',
          isFeedback: '否'
        }
      ],
      headers: [
        {
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { sortable: false, text: '序列号', value: 'id' },
        { sortable: false, text: '名称', value: 'Name' },
        { sortable: false, text: '次数', value: 'Number' },
        { sortable: false, text: '操作'},
        { sortable: false, text: '反馈模式'}
      ],
      headersTask: [
        {
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { sortable: false, text: '任务序号', value: 'id'},
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
  }
}
</script>
