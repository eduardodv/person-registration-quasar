<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :rows="personsFormated"
        :columns="columns"
        row-key="name"
        no-data-label="Nenhum dado encontrado"
      >
        <template v-slot:top>
          <h1 class="text-h5">Cadastro de Pessoas</h1>
          <q-space />
          <q-btn color="primary" label="Adicionar" @click="handleOpenModalNewPerson" />
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn
              icon="edit"
              color="secondary"
              dense size="sm"
              title="Editar"
              @click="handleEditPerson(props.row.id)"
            />
            <q-btn
              icon="delete"
              color="negative"
              dense size="sm"
              title="Excluir"
              @click="handleDeletePerson(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>

    <ModalPerson
      ref="modalPersonRef"
      v-model="showModalFormPerson"
      :getPersons="getPersons"
      @updateShowModalFormPerson="updateShowModalFormPersonValue"
    />
  </q-page>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { QTableColumn, useQuasar, date, useMeta } from 'quasar';
  import personsService from 'src/services/persons'

  import ModalPerson from 'src/components/ModalPerson.vue';

  interface DataProps {
    id: number | null
    nome: string
    cpf: string
    dataNascimento: string
  }

  const metaData = {
    title: 'Home | Person registration quasar'
  }
  useMeta(metaData)

  const $q = useQuasar()

  const { list, remove } = personsService()

  const columns: QTableColumn[] = [
    { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
    { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
    { name: 'cpf', label: 'CPF', field: 'cpf', sortable: true, align: 'left' },
    { name: 'dataNascimento', label: 'Data de Nascimento', field: 'dataNascimento', sortable: true, align: 'left' },
    { name: 'actions', label: 'Ações', field: 'actions', align: 'right' },
  ]

  const persons = ref([])

  const modalPersonRef = ref()

  const showModalFormPerson = ref(false)

  onMounted(() => {
    getPersons()
  })

  const personsFormated = computed(() => {
    return persons.value.map((person: DataProps) => {
      return {
        ...person,
        dataNascimento: date.formatDate(person.dataNascimento, 'DD/MM/YYYY')
      }
    })
  })

  const getPersons = async () => {
    try {
      const response = await list()
      persons.value = response
    } catch(err) {
      console.error(err);
      $q.notify({
        message: 'Erro ao carregar os dados da API.',
        icon: 'close',
        color: 'negative'
      })
    }
  }

  const handleDeletePerson = async (id: number) => {
    try {
      $q.dialog({
        title: 'Remover usuário',
        message: 'Tem certeza que deseja remover o usuário?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await remove(id)

        $q.notify({
          message: 'Usuário removido com sucesso!',
          icon: 'check',
          color: 'positive'
        })

        await getPersons()
      })

    } catch(err) {
      $q.notify({
        message: 'Erro ao remover usuário.',
        icon: 'close',
        color: 'negative'
      })
    }
  }

  const handleEditPerson = async (id: number) => {
    modalPersonRef.value.editPerson(id)
  }

  const handleOpenModalNewPerson = () => {
    showModalFormPerson.value = true
    modalPersonRef.value.resetFormFields()
  }

  const updateShowModalFormPersonValue = (newValue: boolean) => {
    showModalFormPerson.value = newValue;
  }
</script>

<style lang="scss">
  table {
    td:nth-child(2) {
      width: 100%;
    }
  }
</style>
