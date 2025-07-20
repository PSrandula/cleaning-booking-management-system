import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddBooking from "./pages/AddBooking";
import EditBooking from "./pages/EditBooking";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const showNav = !["/", "/login", "/signup", "/404"].includes(location.pathname);

  const getBackgroundClass = () => {
    if (["/", "/login", "/signup"].includes(location.pathname)) {
      return "bg-gradient-to-br from-dark via-primary-dark to-primary";
    }
    return "bg-dark";
  };

  const NotFound = () => {
    return (
      <div className="max-w-md mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 bg-gradient-to-br from-dark via-primary-dark to-primary min-h-screen text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-3xl font-extrabold sm:text-4xl mt-4">Page not found</h2>
        <p className="mt-4 text-lg leading-6 text-white/80">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} text-white`}>
      {showNav && (
        <nav className="bg-white/10 backdrop-blur-md shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="ml-2 text-xl font-semibold text-white">Cleaning Management System</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/dashboard"
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      location.pathname === "/dashboard"
                        ? "border-accent text-white"
                        : "border-transparent text-white/70 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
               <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-800 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddBooking />} />
          <Route path="/edit/:id" element={<EditBooking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
