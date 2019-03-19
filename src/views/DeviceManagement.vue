<template>
  <v-container
    fill-height
    fluid
    grid-list-md
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
      >
        <material-card
          title="可用设备"
          text="Available device"
          color="green"
        >
          <v-data-iterator
            :items="items"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
          >
            <template v-slot:item="props">
              <v-flex
                xs12
                md4
              >
                <v-card v-if="props.item.status">
                  <v-card-title>
                    <h4>服务器:  {{ props.item.name }}</h4>
                  </v-card-title>
                  <v-divider/>
                  <v-list dense>
                    <v-layout
                      row
                    >
                      <v-flex
                        xs12
                        md6
                      >
                        <v-list-tile>
                          <v-list-tile-content>状态:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ props.item.status }}</v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex
                        xs12
                        md6
                      >
                        <v-list-tile>
                          <v-list-tile-content>负载:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ props.item.load }}</v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                    </v-layout>
                  </v-list>
                </v-card>
                <v-layout
                  v-else
                >
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                  >
                    添加设备
                  </v-btn>
                </v-layout>
              </v-flex>
            </template>
          </v-data-iterator>
        </material-card>
        <material-card
          title="运行中设备"
          text="Not working device"
          color="blue"
        >
          <v-data-iterator
            :items="items"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
          >
            <template v-slot:item="props">
              <v-flex
                xs12
                md4
              >
                <v-card>
                  <v-card-title>
                    <h4>服务器:  {{ props.item.name }}</h4>
                  </v-card-title>
                  <v-divider/>
                  <v-list dense>
                    <v-layout
                      row
                      wrap
                    >
                      <v-flex
                        xs6
                        md6
                      >
                        <v-list-tile>
                          <v-list-tile-content>任务数:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ props.item.status }}</v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex
                        xs6
                        md6
                      >
                        <v-list-tile>
                          <v-list-tile-content>负载:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ props.item.load }}</v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex
                        offset-xs7
                      >
                        <v-btn
                          small
                          color="blue"
                        >
                          停止释放
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-list>
                </v-card>
              </v-flex>
            </template>
          </v-data-iterator>
        </material-card>
        <material-card
          title="故障设备"
          text=" device"
          color="red"
        >
          <v-data-iterator
            :items="items"
            :rows-per-page-items="rowsPerPageItems"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
          >
            <template v-slot:item="props">
              <v-flex
                xs12
                md4
              >
                <v-card>
                  <v-card-title>
                    <h4>服务器:  {{ props.item.name }}</h4>
                  </v-card-title>
                  <v-divider/>
                  <v-list dense>
                    <v-layout
                      row
                      wrap
                    >
                      <v-flex
                        xs12
                      >
                        <v-list-tile>
                          <v-list-tile-content>原因:</v-list-tile-content>
                          <v-list-tile-content class="align-end">{{ props.item.status }}</v-list-tile-content>
                        </v-list-tile>
                      </v-flex>
                      <v-flex
                        offset-xs7
                      >
                        <v-btn
                          small
                          color="red"
                        >
                          删除设备
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-list>
                </v-card>
              </v-flex>
            </template>
          </v-data-iterator>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data: () => ({
    rowsPerPageItems: [3, 6, 9],
    pagination: {
      rowsPerPage: 3
    },
    items: [
        {
          name: '192.168.233.148',
          status: 159,
          load: 6.0,
        },
        {
          name: '192.168.233.150',
          status: 237,
          load: 9.0,
        },
        {
        }
      ]
  })
}
</script>
