import { useState, useEffect } from "react"
import skull from "../../public/skull.png"

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear())
    }, 1000 * 60) // Update every minute to account for timezone changes
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-gray-800 text-white py-4 relative bottom-0 w-full">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <p className="text-center">
            &copy; {currentYear} Created with{" "}
            <span role="img" aria-label="love">
              💙
            </span>{" "}
            by{" "}
            <a href="https://akbarirazia.vercel.app/" target="_blank">
              <img
                src={skull}
                height="35px"
                width="35px"
                className="mx-auto my-0"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
