
function PageNotFound() {
  return (
    <>
      <div className="text-4xl m-6 text-red-500 font-bold">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn{`'`}t exist.</p>
      </div>
      <a href="/" className="text-blue-500 mx-6 border-2 px-6 py-2 rounded-md">Go to Home</a>
    </>
  )
}

export default PageNotFound
