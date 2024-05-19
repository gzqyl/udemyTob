import { useState, useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'

function useIsForeground(): boolean{
  const [isForeground, setIsForeground] = useState(true)

  useEffect(() => {
    const onChange = (state: AppStateStatus)=> {
      setIsForeground(state === 'active')
    }
    const listener = AppState.addEventListener('change', onChange)
    return () => listener.remove()
  }, [])

  return isForeground
}

export default useIsForeground
