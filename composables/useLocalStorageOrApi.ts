export const useLocalStorageOrApi = <T>(endpoint: string) => {
  /** Data pulled from localStorage */
  const dataLocalStored = localStorage.getItem(endpoint)

  if (dataLocalStored) {
    return ref<T>(JSON.parse(dataLocalStored))
  }

  /** Client-only api request for data */
  const { data } = useFetch(`/api/${endpoint}`, {
    default: () => [] as T,
    onResponse: ({ response }) => {
      if (response.ok) {
        localStorage.setItem(endpoint, JSON.stringify(response._data))
      }
    },
  })

  return data
}
