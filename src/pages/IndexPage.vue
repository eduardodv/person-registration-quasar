<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :rows="persons"
        :columns="columns"
        row-key="name"
        no-data-label="Nenhum dado encontrado"
      >
        <template v-slot:top>
          <h2 class="text-h5">Cadastro de Pessoas</h2>
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

    <q-dialog v-model="modalForm" persistent>
      <q-card style="min-width: 350px" class="q-pa-sm">
        <!-- <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section> -->

        <q-card-section>
          <div class="text-h6">Formulário de cadastro</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="submitForm"
            class="q-gutter-md"
            greedy
            ref="formRef"
          >
            <q-input
              outlined
              v-model="form.nome"
              label="Nome"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
            />

            <q-input
              outlined
              v-model="form.cpf"
              label="CPF"
              lazy-rules
              type="tel"
              mask="###.###.###-##"
              :rules="[
                val => val && val.length > 0 || 'Campo obrigatório!',
                val => val && val.length > 13 || 'CPF inválido!',
              ]"
            />

            <q-input
              outlined
              v-model="form.dataNascimento"
              label="Data de nascimento"
              lazy-rules
              type="date"
              mask="##/##/####"
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório!']"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup color="primary" />
          <q-btn :label="form.id ? 'Atualizar' : 'Cadastrar'" color="primary" @click="handleSubmitForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import personsService from 'src/services/persons'
  import { QTableColumn, useQuasar } from 'quasar';

  const $q = useQuasar()

  const { list, getById, remove, post, update } = personsService()

  const columns: QTableColumn[] = [
    { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
    { name: 'nome', label: 'Nome', field: 'nome', sortable: true, align: 'left' },
    { name: 'cpf', label: 'CPF', field: 'cpf', sortable: true, align: 'left' },
    { name: 'dataNascimento', label: 'Data de Nascimento', field: 'dataNascimento', sortable: true, align: 'left' },
    { name: 'actions', label: 'Ações', field: 'actions', align: 'right' },
  ]

  const persons = ref([])

  const modalForm = ref(false)

  const formRef = ref()
  const form = ref({
    id: null,
    nome: '',
    cpf: '',
    dataNascimento: '',
  })

  onMounted(() => {
    getPersons()
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
    try {
      handleOpenModalNewPerson()
      const response = await getById(id)
      form.value = response
    } catch(err) {
      $q.notify({
        message: 'Erro ao carregar usuário.',
        icon: 'close',
        color: 'negative'
      })
    }
  }

  const handleOpenModalNewPerson = () => {
    modalForm.value = true
  }

  const resetFormFields = () => {
    form.value = {
      id: null,
      nome: '',
      cpf: '',
      dataNascimento: '',
    }
  }

  const handleSubmitForm = () => {
    formRef.value?.submit()
  }

  const submitForm = async () => {
    try {
      if(form.value.id) {
        await update(form.value)

        $q.notify({
          message: 'Usuário atualizado com sucesso!',
          icon: 'check',
          color: 'positive'
        })
      } else {
        await post(form.value)

        $q.notify({
          message: 'Usuário adicionado com sucesso!',
          icon: 'check',
          color: 'positive'
        })
      }

      await getPersons()
      modalForm.value = false
      resetFormFields()

    } catch(err) {
      console.error(err);
    }
  }
</script>

<style lang="scss">
  table {
    td:nth-child(2) {
      width: 100%;
    }
  }
</style>
