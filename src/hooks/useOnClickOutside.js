import { useEffect } from "react"

const useOnClickOutside = (ref,handler) => {
    useEffect(()=>{
        const listener = (event) => {
            // If the click/touch event originated inside the ref element, do nothing
            
            if(!ref.current || ref.current.contains(event.target)){
                return
            }
            // Otherwise, call the provided handler function
            handler()
        }
        document.addEventListener('mousedown',listener)
        document.addEventListener('touchstart',listener)
        // Cleanup function to remove the event listeners when the component unmounts or when the ref/handler dependencies change
    return ()=>{
        document.removeEventListener('mousedown',listener)
        document.removeEventListener('touchstart',listener)
    }
    },[ref,handler])
}

export default useOnClickOutside