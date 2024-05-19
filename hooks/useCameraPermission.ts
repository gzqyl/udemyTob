import { useState, useEffect } from 'react'
import { Camera } from 'react-native-vision-camera'

function useCameraPermission(): boolean{

  const [isPermi,setIsPermi] = useState(true)

  useEffect(() => {
    (async ()=>{

        const cameraPermission = await Camera.getCameraPermissionStatus()
        const permitted = cameraPermission === "granted"
        setIsPermi(permitted)
  
    })()
  }, [])

  return isPermi
}

export default useCameraPermission
