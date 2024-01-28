function Home() {
  return (
    <>
      {/* hi */}
      <div className="min-h-screen w-full">
        <div className="flex flex-col items-center h-full w-60  overflow-hidden text-white bg-black rounded">
          <a className="flex items-center w-full px-5 mt-3" href="#">
            <i className="fa-solid fa-user-graduate"></i>
            <span className="ml-2 text-sm font-bold">Community Hub</span>
          </a>
          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-heart"></i>
                <span className="ml-2 text-sm font-medium">For You</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-brain"></i>
                <span className="ml-2 text-sm font-medium">
                  Classroom Collab
                </span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 text-gray-200 bg-gray-700 rounded"
                href="#"
              >
                <i className="fa-solid fa-book"></i>
                <span className="ml-2 text-sm font-medium">
                  Acadamic Updates
                </span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span className="ml-2 text-sm font-medium">Lost And Found</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-briefcase"></i>
                <span className="ml-2 text-sm font-medium">
                  Job And Internship
                </span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-person-running"></i>
                <span className="ml-2 text-sm font-medium">Bunk Mate</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <i className="fa-solid fa-tower-broadcast"></i>
                <span className="ml-2 text-sm font-medium">
                  Emergency Alerts
                </span>
              </a>
            </div>
            <div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
              <a
                className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                href="#"
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Products</span>
              </a>
            </div>
          </div>
          <a
            className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
            href="#"
          >
            <svg
              className="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-2 text-sm font-medium">Account</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default Home;
