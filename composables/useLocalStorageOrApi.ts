export const useLocalStorageOrApi = <T>(endpoint: string) => {
  // BUG: localStorage is not defined on server => ask for it only on client
  /** Data pulled from localStorage */
  const dataLocalStored = localStorage.getItem(endpoint)

  if (dataLocalStored) {
    return ref<T>(JSON.parse(dataLocalStored))
  }

  /** Client-only api request for data */
  const { data } = useFetch(`/api/${endpoint}`, {
    server: false,
    default: () => [] as T,
    onResponse: ({ response }) => {
      if (response.ok) {
        localStorage.setItem(endpoint, JSON.stringify(response._data))
      }
    },
  })

  return data
}
