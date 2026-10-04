import Navbar from "../components/Navbar";

const Homepage = () => {
    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-20">

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome to MERN App
                    </h1>

                    <p className="mt-4 text-gray-600">
                        A simple MERN stack application.
                    </p>

                    <div className="mt-8">

                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                            Get Started
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default Homepage;