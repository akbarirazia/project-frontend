import React, { useState } from "react"
import axios from "axios"
import Toast from "./Toast" // Assuming you have a Toast component
import { useNavigate } from "react-router-dom"
// import { useHistory } from "react-router-dom";

const Post: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>("")
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const navigate = useNavigate()
  //   const history = useHistory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 1000)
    // Prepare the form data
    const formData = new FormData()
    formData.append("id", `${id}`)
    formData.append("title", e.currentTarget.titl.value || "title")
    formData.append("content", e.currentTarget.content.value || "no content")
    formData.append("tag", e.currentTarget.tag.value || "")
    formData.append("min", e.currentTarget.min.value || "")
    formData.append("imageUrl", e.currentTarget.image.files[0])

    try {
      const response = await axios.post("http://localhost:3000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Response:", response)
      console.log("Data:", response.data)
      // Display success toast
      setToastMessage("Blog post created successfully!")
      setShowToast(true)
      // Redirect to home page
      setTimeout(() => {
        window.location.href = "/"
      }, 1000) // Redirect after 1 second
    } catch (error) {
      console.error("Error posting data:", error)
      // Display error toast
      setToastMessage("Error creating blog post. Please try again later.")
      setShowToast(true)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      // Read the file and set the image preview URL
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCancelClick = () => {
    setShowConfirmModal(true)
  }

  const handleConfirmCancel = () => {
    setShowConfirmModal(false)
    // Implement cancellation logic here
    navigate("/")
  }

  const handleCancelModalClose = () => {
    setShowConfirmModal(false)
  }

  return (
    <div className="w-screen ">
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
          // type={toastMessage.startsWith("Error") ? "error" : "success"}
        />
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-8 max-w-lg w-full">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to cancel?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md mr-2"
                onClick={handleCancelModalClose}
              >
                No
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                onClick={handleConfirmCancel}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-md p-8 lg:w-1/2 mx-auto my-0">
        <h2 className="text-4xl font-bold mb-4">Create a New Blog Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-2 h-54w-full object-cover rounded-md"
              />
            )}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-3 block w-full rounded-md shadow-sm border-2 focus:border-blue-500 sm:text-sm p-5 border-dashed"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="titl"
              required
              className="mt-1 block w-full rounded-md shadow-md sm:text-lg p-2 h-16 border-gray-300  border-2 focus:border-2 "
              placeholder="Joke of the day!"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="tag"
              className="block text-sm font-medium text-gray-700"
            >
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              className="mt-1 block w-full rounded-md shadow-md sm:text-lg p-2 h-16 border-gray-300  border-2 focus:border-2 "
              placeholder="Funny"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="min"
              className="block text-sm font-medium text-gray-700"
            >
              Minutes of Reading
            </label>
            <input
              type="text"
              id="min"
              name="min"
              className="mt-1 block w-full rounded-md shadow-md sm:text-lg p-2 h-16 border-gray-300  border-2 focus:border-2 "
              placeholder="2MIN"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={15}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:ring-blue-500 focus:border-blue-500 p-2 border-2 sm:text-lg"
              placeholder="This is where your new blog is written..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md mr-2"
              onClick={handleCancelClick}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Post
