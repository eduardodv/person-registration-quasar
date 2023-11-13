<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComponent :toggleLeftDrawer="toggleLeftDrawer" />
    <SidebarMenu v-model="leftDrawerOpen" :essentialLinks="essentialLinks" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeaderComponent from 'components/HeaderComponent.vue';

import SidebarMenu from 'src/components/SidebarMenu.vue';
import { EssentialLinkProps } from 'components/EssentialLink.vue';

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
