// TODO: types via generics
export const useLocalStorageOrApi = (endpoint: string) => {
  /** Data pulled from localStorage */
  const dataLocalStored = localStorage.getItem(endpoint)

  if (dataLocalStored) return ref(JSON.parse(dataLocalStored))

  /** Client-only api request for data */
  const { data } = useFetch(`/api/${endpoint}`, {
    server: false,
    default: () => [],
    onResponse: ({ response: { _data } }) => {
      localStorage.setItem(endpoint, JSON.stringify(_data))
    },
  })

  return data
}
