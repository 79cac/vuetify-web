<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
        md7
      >
        <material-card
          color="green"
          title="登入记录"
          text="Logging record"
        >
          <v-data-table
            :headers="header"
            :items="item"
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
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>

              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex
        xs12
        md5
      >
        <material-card
          color="green"
          title="密码修改"
          text="Change password"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex
                  xs12
                >
                  <v-text-field
                    label="原密码"
                    v-model="password"
                  />
                </v-flex>
                <v-flex
                  xs12
                >
                  <v-text-field
                    label="新密码"
                    v-model="password"
                  />
                </v-flex>
                <v-flex
                  xs12
                >
                  <v-text-field
                    label="重复密码"
                    v-model="password"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                  >
                    修改密码
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    header: [
      {
        sortable: false,
        text: '登入时间',
        value: 'logInTime'
      },
      {
        sortable: false,
        text: '登出时间',
        value: 'logOutTime'
      },
      {
        sortable: false,
        text: '任务数量',
        value: 'number'
      }
    ]
  })
}
</script>
