// TODO: types via generics
export const useLocalStorageOrApi = <T>(endpoint: string) => {
  /** Data pulled from localStorage */
  const dataLocalStored = localStorage.getItem(endpoint)

  if (dataLocalStored) {
    return ref(JSON.parse(dataLocalStored)) as Ref<T>
  }

  /** Client-only api request for data */
  const { data } = useFetch(`/api/${endpoint}`, {
    server: false,
    default: () => [],
    onResponse: ({ response }) => {
      if (response.ok) {
        localStorage.setItem(endpoint, JSON.stringify(response._data))
      }
    },
  })

  return data as Ref<T>
}
