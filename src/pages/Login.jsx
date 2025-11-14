import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useLoginMutation } from "../store/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      dispatch(
        setCredentials({
          user: result.data.user,
          token: result.data.accessToken,
        })
      );

      navigate("/credit-data");
    } catch (err) {
      setErrors({
        submit: err.data?.message || "Invalid credentials. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="p-6 flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold">
            Z
          </div>
          <span className="text-xl font-semibold text-gray-900">Zenpass</span>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Log In</h1>
          <p className="text-gray-600">Welcome back to Zenpass</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            error={errors.password}
          />

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-red-500 hover:text-red-600 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            className="mt-6"
          >
            Log In
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don't have a Zenpass account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-red-500 font-medium hover:text-red-600 transition-colors"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
