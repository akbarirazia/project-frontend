import React from "react"

interface ConfirmModalProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <p className="text-lg text-gray-800">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 mr-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
