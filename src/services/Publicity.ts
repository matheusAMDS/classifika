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
  thumbnail: { originFileObj: File; };
  gallery: { originFileObj: File; }[];
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

export async function newPublicity(data: NewPublicityData) {
  const token = localStorage.getItem('token')
  const formData = new FormData()

  try {
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('thumbnail', data.thumbnail.originFileObj)
    formData.append('whatsapp', data.whatsapp)
    data.gallery && 
    data.gallery.forEach(obj => formData.append('gallery', obj.originFileObj))

    await api.post('/publicity', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error)
  }
}