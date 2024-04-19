import { Link } from "react-router-dom"

function PostBlog() {
  return (
    <div className="m-10">
      {/* {showModal && <PostModal closeModal={() => setShowModal(false)} />} */}
      <Link to="/post">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full my-0 mx-auto block p-5"
          onClick={() => {
            // setShowModal(true)
          }}
        >
          Post a Blog
        </button>
      </Link>
    </div>
  )
}

export default PostBlog
