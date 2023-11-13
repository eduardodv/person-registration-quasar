<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :rows="orders"
        :columns="columns"
        row-key="name"
        no-data-label="Nenhum pedido encontrado"
      >
        <template v-slot:top>
          <h1 class="text-h5">Cadastro de Pedidos</h1>
          <q-space />
          <q-btn color="primary" label="Adicionar" />
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn
              icon="edit"
              color="secondary"
              dense size="sm"
              title="Editar"
            />
            <q-btn
              icon="delete"
              color="negative"
              dense size="sm"
              title="Excluir"
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
  import { QTableColumn, useMeta } from 'quasar';
import { ref } from 'vue';
  const metaData = {
    title: 'Pedidos | Person registration quasar'
  }

  useMeta(metaData)

  const columns: QTableColumn[] = [
    { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
    { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
    { name: 'dataEmissao', label: 'Data de emissão', field: 'dataEmissao', sortable: true, align: 'left' },
    { name: 'valorTotal', label: 'Valor total', field: 'valorTotal', sortable: true, align: 'left' },
    { name: 'itens', label: 'Itens', field: 'itens', sortable: true, align: 'left' },
    { name: 'actions', label: 'Ações', field: 'actions', align: 'right' },
  ]

  const orders = ref([])

</script>
