import { useNavigate } from "react-router-dom";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import Button from "../components/common/Button";
import { useFetchCreditScoreQuery } from "../store/api/authApi";
import { Loader } from "../components/common/Loader";
import {
  getCreditScoreRange,
  creditRangesOffers,
} from "../components/common/getCreditScoreRange";

export default function CreditScore() {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "You qualify for pre-approved loan offers",
      description: "Access loans from ₦50,000 to ₦5,000,000",
      icon: <CheckCircle2 className="text-green-500" size={20} />,
    },
    {
      title: "Competitive interest rates available",
      description: "Starting from 2.5% interest per month",
      icon: <CheckCircle2 className="text-green-500" size={20} />,
    },
    {
      title: "No collateral needed",
      description: "Your business data is your credit",
      icon: <CheckCircle2 className="text-green-500" size={20} />,
    },
  ];

  const { data, isLoading } = useFetchCreditScoreQuery();

  const scoreOver100 = (data?.data?.[0]?.creditScore / 850) * 100;

  const score = data?.data?.[0]?.creditScore;
  const { label, color, icon } = getCreditScoreRange(score);

  const normalizedScore = score > 850 ? score / 10 : score;

  const range = creditRangesOffers.find(
    (r) => normalizedScore >= r.min && normalizedScore <= r.max
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white font-bold">
            Z
          </div>
          <span className="text-xl font-semibold text-gray-900">Zenpass</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Credit Score
          </h1>
          <p className="text-gray-600">
            Based on your financial data and business history
          </p>
        </div>

        {isLoading ? (
          <Loader text="Fetching Credit Score..." />
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <svg className="transform -rotate-90" width="240" height="240">
                  <circle
                    cx="120"
                    cy="120"
                    r="100"
                    stroke="#E5E7EB"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="100"
                    stroke={`${color}`}
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${(scoreOver100 / 100) * 628} 628`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`text-6xl font-bold ${color} `}>
                    {data?.data[0]?.creditScore}
                  </div>
                  <div className="text-sm text-gray-500">out of 850</div>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center justify-center space-x-2 mb-6">
              <TrendingUp className={icon} size={20} />
              <span className={`text-2xl font-semibold `}>{label}</span>
            </div> */}

            <div className="flex items-center justify-center space-x-2 mb-6">
              <TrendingUp style={{ color: icon }} size={20} />
              <span className="text-2xl font-semibold" style={{ color: color }}>
                {label}
              </span>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                What This Means
              </h2>
              <div className="space-y-4">
                {/* {data?.data[0]?.maxLoanAmount == 0 }
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">{benefit.icon}</div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">
                        {benefit.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))} */}
                <div className="space-y-3 mt-4">
                  {range.details.map((item, index) => (
                    <p
                      key={index}
                      className="text-gray-700 text-base flex items-center gap-2"
                    >
                      <CheckCircle2 className="text-green-500" size={20} />{" "}
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        {/* <Button
          onClick={() => navigate("/loan-offers")}
          variant="primary"
          fullWidth
          className="text-lg py-4"
        >
          View Your Loan Offers
        </Button> */}
      </div>
    </div>
  );
}
