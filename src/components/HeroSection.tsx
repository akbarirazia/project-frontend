const HeroSection = () => {
  return (
    <section className="bg-gray-200 py-16 w-screen flex justify-center items-center background h-96 ">
      <div className="max-w-6xl mx-auto container glassmorphic-container  sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className=" ">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight mb-4">
                Welcome to <span className="text-blue-500">Humor</span>Hub
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get ready to explore fascinating stories, insightful articles,
                and entertaining content that will blow your mind!
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                <a href="#main">Start Exploring</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
