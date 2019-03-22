<template>
  <v-app>
    <core-filter v-if="$route.name !== 'logIn'"/>

    <core-toolbar v-if="$route.name !== 'logIn'"/>

    <core-drawer v-if="$route.name !== 'logIn'"/>

    <core-view />
    <notifications position="top center" group="foo" />
  </v-app>
</template>

<style lang="scss">
@import '@/styles/index.scss';
</style>
