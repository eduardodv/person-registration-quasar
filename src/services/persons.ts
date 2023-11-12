import useApi from '../composables/UseApi';

export default function personsService () {
  const { list, getById, post, update, remove } = useApi('/pessoas')

  return {
    list,
    getById,
    post,
    update,
    remove
  }
}
