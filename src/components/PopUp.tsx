// Popup.js
interface PopUpProps {
  message: string
  isSuccess: boolean
  onClose: () => void
}
const Popup: React.FC<PopUpProps> = ({ message, isSuccess, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isSuccess ? "text-green-500" : "text-red-500"
      }`}
    >
      <div className="bg-white rounded-lg p-8 max-w-md">
        <span
          className="absolute top-0 right-0 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Popup
