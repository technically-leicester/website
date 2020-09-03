import { useEffect, useState } from 'react'
import directusClient from './directusClient'

export const useDirectus = (fn) => {
  const [response, setResponse] = useState()
  const [error, setError] = useState()

  useEffect(() => {

    const fetcher = async () => {
      try {
        const result = await fn(directusClient)
        setResponse(result)
      } catch (err) {
        setError(err)
      }
    }

    fetcher()
  }, [])

  return [
    response,
    error
  ]
}
