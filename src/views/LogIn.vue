<template>
  <v-container>
    <v-layout justify-center>
      <v-flex
        xs12
        sm10
        md6
      >
        <material-card
          color="blue"
          title="登入"
          text="Logging In"
        >
          <v-form>
            <v-container>
              <v-layout wrap row>
                <v-flex
                  xs12
                >
                  <v-text-field
                    label="用户名"
                    v-model="username"
                    :rules="[rules.required]"
                  />
                </v-flex>
                <v-flex
                  xs12
                >
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required, rules.min]"
                    type="password"
                    label="密码"
                    hint="At least 8 characters"
                  />
                </v-flex>
                <v-flex
                  xs4
                  offset-xs2
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="blue"
                    @click="log"
                  >
                    登入
                  </v-btn>
                </v-flex>
                <v-flex
                  xs5
                  offset-xs1
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="blue"
                    @click="reset"
                  >
                    注册
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-dialog
        v-model="dialog"
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
            请联系管理员：13812345678
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialog=false"
            >
              确认
            </v-btn>
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
    username: 'admin',
    password: 'password',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match')
    }
  }),
  methods: {
    log: function () {
      this.$http({
        method: 'POST',
        url: '/signIn',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res)
        if (res.data.status == 'Already' || res.data.status == 'OK') {
          this.$router.push('/info-board')
        }
      }).catch(res => {
        console.log(res)
      })     
    },
    reset: function () {
      this.dialog = true
    }
  }
}
</script>
