<template>
  <q-dialog>
    <q-card style="min-width: 350px" class="q-pa-sm">
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
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import personsService from 'src/services/persons';
import { ref } from 'vue';

const $q = useQuasar()

const props = defineProps(['getPersons'])

const emit = defineEmits(['updateShowModalFormPerson'])

const { getById, post, update } = personsService()

const formRef = ref()

const form = ref({
  id: null,
  nome: '',
  cpf: '',
  dataNascimento: '',
})

const resetFormFields = () => {
  form.value = {
    id: null,
    nome: '',
    cpf: '',
    dataNascimento: '',
  }
}

const editPerson = async (id: number) => {
  try {
    emit('updateShowModalFormPerson', true);
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

defineExpose({ editPerson })

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

    await props.getPersons()
    emit('updateShowModalFormPerson', false);
    resetFormFields()

  } catch(err) {
    console.error(err);
    $q.notify({
      message: 'Erro ao salvar usuário.',
      icon: 'close',
      color: 'negative'
    })
  }
}
</script>
