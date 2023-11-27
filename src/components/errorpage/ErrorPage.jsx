
const ErrorPage = () => {
    return (
        <div>
    <div className="flex h-screen bg-gray-200">
      <div className="m-auto text-center">
        <h1 className="text-5xl font-semibold text-red-600">Error</h1>
        <p className="text-xl text-gray-700">Something went wrong. We apologize for the inconvenience.</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <a href="/">Go to Homepage</a>
        </button>
      </div>
    </div>
        </div>
    );
};

export default ErrorPage;