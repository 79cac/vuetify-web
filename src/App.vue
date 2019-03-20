<template>
  <v-app>
    <core-filter v-if="$route.name !== 'logIn'"/>

    <core-toolbar v-if="$route.name !== 'logIn'"/>

    <core-drawer v-if="$route.name !== 'logIn'"/>

    <core-view />
  </v-app>
</template>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
