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
                    <template v-slot:append-outer>
                      <v-slide-x-reverse-transition
                        mode="out-in"
                      >
                        <v-icon
                          :color="isEditing ? 'success' : 'info'"
                          @click="isEditing = !isEditing"
                          v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                        />
                      </v-slide-x-reverse-transition>
                    </template>
                  </v-autocomplete>
                </v-flex>
                <v-flex
                  xs12
                  md4
                >
                  <v-text-field
                    label="重复次数"
                  />
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
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex
              xs12
              md5
            >
              <v-flex
                sx12
                md10
              >
                <v-text-field label="源IP地址"/>
              </v-flex>
              <v-flex
                sx12
                md10
              >
                <v-text-field label="目的IP地址"/>
              </v-flex>
              <v-flex
                xs12
                md4
              >
                <v-checkbox
                  v-model="checkbox"
                  label="单向模式"
                />
              </v-flex>
              <v-flex
                offset-xs6
              >
                <v-btn
                  color="green"
                >
                  发送流量
                </v-btn>
              </v-flex>
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
        checkbox: true,
        isEditing: false,
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
            Number: '1'
          },
          {
            id: '2',
            Name: '124',
            Number: '1'
          }
        ],
        headers: [
          {
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: '序列号', value: 'id' },
          { text: '名称', value: 'Name' },
          { text: '次数', value: 'Number' },
          { text: '操作'}
        ]
      }
    }
  }
</script>
