import React, { useEffect, useState } from "react"

interface ToastProps {
  message: string
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose()
    }, 4000) // Close the toast after 3 seconds

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`toast ${visible ? "toast-show" : "toast-hide"}`}>
      {message}
    </div>
  )
}

export default Toast
