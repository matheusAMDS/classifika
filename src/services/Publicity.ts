import api from 'services/api'
import useSWR from 'swr'

export interface Publicity {
  _id: string;
  title: string;
  description: string;
  category: string;
  whatsapp: string;
  thumbnail: string;
  gallery?: string[];
  createdAt: number;
  byUser: {
    name: string;
    email: string;
  }
}

export interface NewPublicityData {
  title: string;
  description: string;
  category: string;
  whatsapp: string;
  thumbnail: File;
}

interface APIResult {
  publicities: Publicity[];
  total: number;
}

export function usePublicities(category:string, page:number) {
  page = page || 1
  const key = category 
    ? `/publicity?category=${category}&page=${page}` 
    : `/publicity?page=${page}`

  const { data, error } = useSWR(key, async url => {
    const response = await api.get<APIResult>(url)

    return response.data
  })

  return {
    publicities: data && data.publicities,
    total: data && data.total,
    isLoading: !data && !error,
    error
  }
}

class PublicityServices {
  static async show(id:string) {
    return await api.get<Publicity>(`/publicity/${id}`) 
  }

  static async paths() {
    const response = await api.get<APIResult>('/publicity')
    const paths = response.data.publicities.map(publicity => ({
      params: {
        id: publicity._id
      }
    }))

    return paths
  }
}

export default PublicityServices