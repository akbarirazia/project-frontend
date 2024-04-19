import ReactDOM from "react-dom"

interface ModalProps {
  title: string
  content: string
  image: string
  tag: string
  min: string
  isClose: () => void
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  image,
  min,
  tag,
  isClose,
}) => {
  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70"></div>
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-1/2 lg:min-h-1/2 bg-white rounded text-black p-2 pb-8 w-3/4 ">
        <button
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2 float-end"
          onClick={isClose}
        >
          Close
        </button>
        <br />
        <div className="max-w-sm w-full lg:max-w-full ">
          <img src={image} alt={title} className="rounded" />

          <div className="border-r border-b border-l bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">
                {title}
              </div>
              <p className="text-gray-700 text-base">{content}</p>
            </div>
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{tag}</p>
                <p className="text-gray-600">{min}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal") as HTMLElement
  )
}

export default Modal
