import axios from "axios"
import { useEffect, useState } from "react"

interface PostModalProps {
  closeModal: () => void
}

const NewModal: React.FC<PostModalProps> = ({ closeModal }) => {
  const handleSave = () => {
    // Add your save logic here
    console.log("Save button clicked")
  }
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0]
    body.style.overflowY = "hidden"
    return () => {
      body.style.overflowY = "auto"
    }
  }, [])
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 1000)
    // Prepare the form data
    const formData = new FormData()
    formData.append("id", `${id}`)
    formData.append("title", e.target.title.value || "title")
    formData.append(
      "content",
      e.target.content.value ||
        "Generic content, lorem ipsum dolor sit amet con etiam null tempor"
    )
    formData.append("tag", e.target.tag.value || "Tag")
    formData.append("min", e.target.min.value || "7 MIN")
    formData.append("imageUrl", e.target.image.files[0])

    console.log(e.target.image.files[0])
    try {
      const response = await axios.post("http://localhost:3000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Response:", response)
      console.log("Data:", response.data)
      closeModal()
      window.location.reload()
    } catch (error) {
      console.error("Error posting data:", error)
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

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                {/* Heroicon name: outline/exclamation */}
                <svg
                  className="h-6 w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M12 16h.01"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Confirmation
                </h3>
                <div className="mt-2">
                  <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 bg-white rounded text-black p-2 pb-8 w-3/4 overflow-y-auto">
                    <form onSubmit={handleSubmit}>
                      <button
                        type="submit"
                        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2 float-end"
                      >
                        Post Blog
                      </button>
                      <button
                        type="button"
                        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2 float-end me-3"
                        onClick={() => closeModal()}
                      >
                        Close
                      </button>
                      <br />
                      <div className="max-w-sm w-full lg:max-w-full ">
                        <input
                          type="file"
                          name="image"
                          id="image"
                          onChange={handleImageChange}
                        />
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-2 mb-2 w-full h-auto"
                          />
                        )}
                        <div className="border-r border-b border-l bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                          <div className="mb-8">
                            <input
                              type="text"
                              name="title"
                              className="text-gray-900 font-bold text-xl mb-2"
                              placeholder="Title"
                            />

                            <input
                              type="text"
                              name="content"
                              className="text-gray-700 text-base"
                              placeholder="Content"
                            />
                          </div>
                          <div className="flex items-center">
                            <div className="text-sm">
                              <input
                                type="text"
                                name="tag"
                                className="text-gray-900 leading-none"
                                placeholder="Tag"
                              />
                              <input
                                type="text"
                                name="min"
                                className="text-gray-600"
                                placeholder="Min"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSave}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewModal
