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
              <td>{{ item.logInTime }}</td>
              <td>{{ item.logOutTime }}</td>
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
                    :rules="[rules.required, rules.min]"
                    type="password"
                  />
                </v-flex>
                <v-flex
                  xs12
                >
                  <v-text-field
                    label="新密码"
                    v-model="newpassword"
                    :rules="[rules.required, rules.min]"
                    type="password"
                  />
                </v-flex>
                <v-flex
                  xs12
                >
                  <v-text-field
                    label="重复密码"
                    v-model="again"
                    :rules="[rules.required, rules.min]"
                    type="password"
                  />
                </v-flex>
                <v-flex
                  xs12
                  text-xs-right
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="changePW"
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
    password: null,
    newpassword: null,
    again: null,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match')
    },
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
      }
    ],
    item: []
  }),
  methods: {
    changePW: function () {
      if (this.newpassword !== this.again) {
        this.$notify.warn('请输入相同的新密码')
        return
      }
      if (this.newpassword === this.password) {
        this.$notify.warn('新密码应与原密码不同')
        return
      }

      this.$http({
        method: 'POST',
        url: '/changePW',
        data: {
          password: this.password,
          newpassword: this.newpassword
        }
      }).then(res => {
        if (res.data.status === 'log') {
          this.$router.push('/logIn')
          this.$notify.warn('请先登入')
          return 
        }
        if (res.data.status === 'OK') {
          this.$notify.success('修改成功')
        }
        if (res.data.status === 'Password False') {
          this.$notify.warn('输入密码错误')
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
    }
  },
  mounted () {
    this.$http({
      method: 'POST',
      url: '/logInfo',
    }).then(res => {
      if (res.data.status === 'OK') {
        if (res.data.status === 'log') {
          this.$router.push('/logIn')
          this.$notify.warn('请先登入')
          return 
        }
        this.item = []
        for (let i of res.data.data) {
          this.item.push({
            logInTime: this.toTime(i[0]),
            logOutTime: this.toTime(i[1])           
          })
        }
      }
    }).catch(res => {
      this.$notify.error('服务器错误')
    })
  }
}
</script>
