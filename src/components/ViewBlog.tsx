import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import placeholder from "../../public/placeholder-image.png"

const baseUrl = "http://localhost:3000/uploads"

const ViewBlog = () => {
  const { id } = useParams<{ id: string }>()
  const [image, setImage] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }

        const data = await response.json()
        setData(data)
        setIsLoading(false)
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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
        <div className="flex flex-wrap mb-4">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
            {data.tag}
          </span>
        </div>
        <div className=" flex items-center mb-4">
          <span className="text-gray-600">{data?.min}</span>
          <div className="h-1 w-10/12 bg-gray-300 mx-4"></div>
        </div>
        <img src={image || ""} alt={data?.title} className="mb-4" />
        <div className="prose">{data?.content}</div>
      </div>
    </div>
  )
}

export default ViewBlog
