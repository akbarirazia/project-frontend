import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Toast from "./Toast"
import placeholder from "../../public/placeholder-image.png"
const baseUrl = "http://localhost:3000/uploads"

function Edit() {
  const { id } = useParams<{ id: string }>()
  const [image, setImage] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)
  const [editedTitle, setEditedTitle] = useState(data?.title)
  const [editedContent, setEditedContent] = useState(data?.content)
  const [editedTag, setEditedTag] = useState(data?.tag)
  const [editedMin, setEditedMin] = useState(data?.min)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string>("")
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [question, setQuestion] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const data = await response.json()
        setData(data)
        console.log(data)

        setEditedContent(data.content)
        setEditedMin(data.min)
        setEditedTitle(data.title)
        setEditedTag(data.tag)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (data && data.imageUrl) {
          const response = await fetch(`${baseUrl}/${data.imageUrl}`)
          if (!response.ok) {
            throw new Error("Failed to fetch image")
          }
          const blob = await response.blob()
          const imgUrl = URL.createObjectURL(blob)
          setImage(imgUrl)
        } else {
          setImage(placeholder)
        }
      } catch (error) {
        console.error("Error fetching image:", error)
      }
    }

    fetchImage()

    // Clean up the URL object to prevent memory leaks
    return () => {
      if (image) {
        URL.revokeObjectURL(image)
      }
    }
  }, [data])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("title", editedTitle)
      formData.append("content", editedContent)
      formData.append("tag", editedTag)
      formData.append("min", editedMin)
      if (e.currentTarget.image.files[0]) {
        formData.append("imageUrl", e.currentTarget.image.files[0]) // Append the file to FormData
      }
      console.log(formData)

      await axios.put("http://localhost:3000/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setShowToast(true)
      setToastMessage("Blog was successfully edited")
      setTimeout(() => navigate("/"), 1000)

      // console.log(response)
    } catch (error) {
      console.error("Error updating blog post:", error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      // setImage(file)
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCancelClick = () => {
    setShowConfirmModal(true)
    setQuestion("Are you sure you want to cancel?")
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
            <p className="text-lg font-semibold mb-4">{question}</p>
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
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-8 max-w-lg w-full">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to edit this blog?
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
                onClick={handleSubmit}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-md p-8 lg:w-1/2 mx-auto my-0">
        <h2 className="text-4xl font-bold mb-4">Create a New Blog Post</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>

            <img
              src={image as string}
              alt="Image Preview"
              className="mt-2 h-54w-full object-cover rounded-md"
            />

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
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
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
              value={editedTag}
              onChange={(e) => setEditedTag(e.target.value)}
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
              value={editedMin}
              onChange={(e) => setEditedMin(e.target.value)}
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
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
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
              Edit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit
