<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src="logo"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">
            攻击流量释放系统
          </v-list-tile-title>
        </v-list-tile>
        <v-divider/>
        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          />
        </v-list-tile>
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
        </v-list-tile>      
        <v-list-tile
          active-class="primary"
          class="v-list-item v-list__tile--buy"
          @click="dialog = true"
        >
          <v-list-tile-action>
            <v-icon>mdi-backspace</v-icon>
          </v-list-tile-action>
          
          <v-list-tile-title class="font-weight-light">
            账户注销
          </v-list-tile-title>
        </v-list-tile>
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
              确认退出吗？
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="dialog = false"
              >
                确认
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>  
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    dialog: false,
    logo: './img/vuetifylogo.png',
    links: [
      {
        to: '/info-board',
        icon: 'mdi-view-dashboard',
        text: '信息面板'
      },
      {
        to: '/flow-release',
        icon: 'mdi-atom',
        text: '流量释放'
      },
      {
        to: '/user-profile',
        icon: 'mdi-account',
        text: '用户信息'
      },
      {
        to: '/flow-list',
        icon: 'mdi-clipboard-outline',
        text: '流量列表'
      },
      // {
      //   to: '/typography',
      //   icon: 'mdi-format-font',
      //   text: 'Typography'
      // },
      {
        to: '/device-management',
        icon: 'mdi-chart-bubble',
        text: '设备管理'
      }
      // {
      //   to: '/log-out',
      //   icon: 'mdi-backspace',
      //   text: '账户注销'
      // }
    ],
    responsive: false
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
