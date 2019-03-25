<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
      >
        <material-card
          color="dark"
          title="流量提取"
          text="Flow extract"
        >
          <v-container grid-list-md>
            <v-layout wrap row >
              <v-flex xs10> 
                <v-text-field label="pcap file*" type="file" id="pcapFile" required />
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field label="攻击名称*" v-model="name" required/>
              </v-flex>
              <v-flex xs12 sm4 offset-sm2>
                <v-text-field label="协议类型" v-model="proto" />
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field label="源IP地址*" v-model="srcIP" required/>
              </v-flex>
              <v-flex xs12 sm4 offset-sm2>
                <v-text-field label="目的IP地址*" v-model="dstIP" required/>
              </v-flex>
              <v-flex xs12 sm4>
                <v-text-field label="攻击平台" v-model="attackPlat" />
              </v-flex>
              <v-flex xs12 sm4 offset-sm2>
                <v-text-field label="被攻击平台" v-model="serverPlat" />
              </v-flex>
              <v-flex xs12 offset-xs8>
                <v-btn color="green darken-1" @click="load">流量导入</v-btn>
              </v-flex>
            </v-layout>
          </v-container>

        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    pcapFile: null,
    name: null,
    srcIP: null,
    dstIP: null,
    proto: null,
    attackPlat: null,
    serverPlat: null
  }),
  methods: {
    load: function() {
      this.pcapFile = document.getElementById("pcapFile").files[0]
      let data = new FormData()
      data.append("file", this.pcapFile)
      data.append("proto", this.proto)
      data.append("srcIP", this.srcIP)
      data.append("dstIP", this.dstIP)
      data.append("attackName", this.name)
      data.append("attackPlat", this.attackPlat)
      data.append("serverPlat", this.serverPlat)
      let headers = {
        headers: {"Content-Type": "multipart/form-data"}
      }
      this.$http({
        method: 'POST',
        url: '/load',
        data: data,
        headers: headers
      }).then(res => {
        if (res.data.status === 'OK') {
          this.$notify.success('导入成功')
          return
        }
        if (res.data.status === 'file') {
          this.$notify.error('文件发生错误')
          return
        }
        if (res.data.status === 'store') {
          this.$notify.error('导入发生错误')
          return
        }
        if (res.data.status === 'log') {
          this.$notify.warn('请先登入')
          this.$router.push('/logIn')
          return
        }
      }).catch(res => {
        this.$notify.error('服务器错误')
      })
    }
  }
} 
</script>