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
          color="green"
          title="流量提取"
          text="Flow extract"
        >
          <v-container grid-list-md>
            <v-layout wrap row >
              <v-flex xs10> 
                <v-text-field label="pcap file*" type="file" id="pcapFile" required />
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="攻击名称*" v-model="name" required/>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="协议类型" v-model="proto" />
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="源IP地址*" v-model="srcIP" required/>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="目的IP地址*" v-model="dstIP" required/>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="攻击平台" v-model="attackPlat" />
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="被攻击平台" v-model="serverPlat" />
              </v-flex>
              <v-flex xs12 offset-xs8>
                <v-btn color="blue darken-1" flat @click="load">导入</v-btn>
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
  })
} 
</script>