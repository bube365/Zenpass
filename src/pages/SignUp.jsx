import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useRegisterMutation } from "../store/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/slices/authSlice";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Checkbox from "../components/common/Checkbox";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    businessName: "",
    phoneNumber: "",
    referralCode: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
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
      const result = await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        businessName: formData.businessName,
        phoneNumber: formData.phoneNumber,
        // referralCode: formData.referralCode || undefined,
        role: "USER",
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
        submit: err.data?.message || "Registration failed. Please try again.",
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

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
          <p className="text-[#868786]">Get started in less than 2 minutes</p>
        </div>

        <form onSubmit={handleSubmit} className=" w-full">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              error={errors.fullName}
            />

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
              placeholder="Create a password"
              required
              error={errors.password}
            />

            <Input
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter your business name"
              required
              error={errors.businessName}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex space-x-2">
                <div className="w-20">
                  <Input
                    leftIcon={<span className="text-sm">🇳🇬</span>}
                    value="+234"
                    disabled
                  />
                </div>
                <div className="flex-1">
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="816 680 4116"
                    required
                    error={errors.phoneNumber}
                  />
                </div>
              </div>
            </div>
            <Input
              label="Referral Code (Optional)"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="Enter referral code"
            />
          </div>

          <div>
            <Checkbox
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              label={
                <span>
                  I have read, understood, and agree to{" "}
                  <a href="#" className="text-red-500 hover:text-red-600">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-red-500 hover:text-red-600">
                    Privacy Policy
                  </a>
                </span>
              }
              required
            />
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
            )}
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
            Sign up
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have a Zenpass account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-red-500 font-medium hover:text-red-600 transition-colors"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
