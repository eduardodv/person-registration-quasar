<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComponent :toggleLeftDrawer="toggleLeftDrawer" />
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="sidebar-menu"
      :width="200"
    >
      <q-list bordered separator>
        <span class="title-menu text-center">MENU</span>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderComponent from 'components/HeaderComponent.vue';

import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue';

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Pessoas',
    icon: 'person_add',
    link: '/'
  },
  {
    title: 'Pedidos',
    icon: 'grading',
    link: '/pedidos'
  }
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss">
  .sidebar-menu {
    background-color: darken($primary, 7%);
    border: 0;

    .title-menu {
      color: #fff;
      font-weight: bold;
      display: block;
      padding: 13.5px;
    }

    .q-item {
      color: #fff;

      &.q-router-link--exact-active:not(:hover) {
        background-color: darken($primary, 13%);
      }
    }
  }
</style>
