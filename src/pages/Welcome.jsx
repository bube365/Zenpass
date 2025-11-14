import { useNavigate } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import Button from "../components/common/Button";
import heroBg from "../assets/landingBg.png";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white relative overflow-hidden">
      <div className="w-[100vw] h-[100vh] absolute z-10 opacity-[0.55] bg-black " />
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 bg-cover bg-center"
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="p-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold">
              Z
            </div>
            <span className="text-xl font-medium tracking-wide text-white">
              Zenpass
            </span>
          </div>
          <button className="w-8 h-8 rounded-full shadow-sm flex items-center justify-center hover:shadow-md transition-shadow">
            <HelpCircle size={20} className="text-white" />
          </button>
        </header>

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-[400px]">
            <h1 className="text-2xl tracking-wide  lg:text-4xl font-medium text-white mb-6 leading-tight">
              Access Affordable Credit Your Way
            </h1>
            <p className="text-xs md:text-sm font-normal  text-white/90 mb-8">
              Build your credit score with actual business data and get
              pre-qualified loans in minutes.
            </p>
            <Button
              onClick={() => navigate("/signup")}
              variant="primary"
              fullWidth
              className="text-lg py-4"
            >
              Get Started
            </Button>
            <p className="mt-6 text-white/90">
              Already have a Zenpass account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="underline hover:text-white font-medium"
              >
                Log in
              </button>
            </p>
          </div>
        </div>

        {/* <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-lg w-full text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Access Affordable Credit Your Way
              </h1>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Build your credit score with actual business data and get
                pre-qualified loans in minutes.
              </p>
            </div>

            <div className="pt-4 space-y-4">
              <Button
                onClick={() => navigate("/signup")}
                variant="primary"
                fullWidth
                className="text-lg py-4"
              >
                Get Started
              </Button>
              <p className="text-sm text-gray-600">
                Already have a Zenpass account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-red-500 font-medium hover:text-red-600 transition-colors"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
