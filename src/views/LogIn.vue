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
                  />
                </v-flex>
                <v-flex
                  xs12
                >
                  <v-text-field
                    label="密码"
                    v-model="password"
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
                    密码重置
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
    username: null,
    password: null
  }),
  methods: {
    log: function () {
      this.$router.push('/info-board')
    },
    reset: function () {
      this.username = ''
      this.password = ''
    }
  }
}
</script>
