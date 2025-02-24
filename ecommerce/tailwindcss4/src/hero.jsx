function Hero() {
    return (
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">Welcome to MyApp</h1>
          <p className="text-xl text-blue-700 mb-8">Your one-stop solution for amazing products.</p>
          <button className="m-6 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 text-lg">
     Get Started
    </button>
        </div>
      </div>
    );
  }
export default Hero;