import { api } from 'boot/axios'

interface DataProps {
  id: number | null
  nome: string
  cpf: string
  dataNascimento: string
}

export default function useApi(url: string) {
  const list = async () => {
    try {
      const response = await api.get(url)
      return response.data

    } catch(err) {
      throw new Error(err);
    }
  }

  const getById = async (id: number) => {
    try {
      const response = await api.get(`${url}/${id}`)
      return response.data

    } catch(err) {
      throw new Error(err);
    }
  }

  const post = async (data: DataProps) => {
    try {
      const response = await api.post(url, data)
      return response.data

    } catch(err) {
      throw new Error(err);
    }
  }

  const update = async (data) => {
    try {
      const response = await api.put(`${url}/${data.id}`, data)
      return response.data

    } catch(err) {
      throw new Error(err);
    }
  }

  const remove = async (id: number) => {
    try {
      const response = await api.delete(`${url}/${id}`)
      return response.data

    } catch(err) {
      throw new Error(err);
    }
  }

  return {
    list,
    getById,
    post,
    update,
    remove
  }
}
