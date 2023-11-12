<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="handleToggleLeftDrawer"
      />

      <q-toolbar-title>
        Cadastro
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
  interface Props {
    toggleLeftDrawer: () => void;
  }

  const props = withDefaults(defineProps<Props>(), {
    toggleLeftDrawer: () => Boolean,
  });

  function handleToggleLeftDrawer() {
    props.toggleLeftDrawer()
  }
</script>
