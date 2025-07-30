export const useLocalStorageOrApi = <T>(
  endpoint = '',
  fallback: T | [] = [],
) => {
  /** Data pulled from localStorage */
  const dataLocalStored = localStorage.getItem(endpoint)

  if (dataLocalStored)
    return ref<T>(JSON.parse(dataLocalStored))

  /** Api request for data */
  const { data } = useFetch(`/api/${endpoint}`, {
    default: () => fallback,
    onResponse: ({ response }) => {
      if (response.ok) 
        localStorage.setItem(endpoint, JSON.stringify(response._data))
    },
  })

  return data
}
