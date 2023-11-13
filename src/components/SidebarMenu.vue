<template>
  <q-drawer
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
</template>

<script setup lang="ts">
  import EssentialLink from 'components/EssentialLink.vue';
  defineProps(['essentialLinks'])
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
