export const getCreditScoreRange = (score) => {
  if (score >= 800) {
    return {
      label: "Excellent",
      color: "#16a34a",
      icon: "#22c55e",
    };
  }
  if (score >= 740) {
    return {
      label: "Very Good",
      color: "#15803d",
      icon: "#22c55e",
    };
  }
  if (score >= 670) {
    return { label: "Good", color: "#2563eb", icon: "#3b82f6" };
  }
  if (score >= 580) {
    return { label: "Fair", color: "#ca8a04", icon: "#eab308" };
  }
  return { label: "Poor", color: "#dc2626", icon: "#ef4444" };
};

export const creditRangesOffers = [
  {
    label: "Excellent",
    min: 800,
    max: 850,
    color: "text-green-600",
    details: [
      "Very high likelihood of loan approval",
      "Most favorable interest rates",
      "Access to higher loan limits",
    ],
  },
  {
    label: "Very Good",
    min: 740,
    max: 799,
    color: "text-teal-600",
    details: [
      "Strong approval probability",
      "Competitive interest rates",
      "Flexible loan options",
    ],
  },
  {
    label: "Good",
    min: 670,
    max: 739,
    color: "text-blue-600",
    details: [
      "Moderate to strong approval chances",
      "Standard interest rates",
      "Suitable for most loan products",
    ],
  },
  {
    label: "Fair",
    min: 580,
    max: 669,
    color: "text-yellow-600",
    details: [
      "Loan approval possible",
      "Higher interest rates than average",
      "Lower loan limits",
      "Additional documentation or collateral may be required",
    ],
  },
  {
    label: "Poor",
    min: 300,
    max: 579,
    color: "text-red-600",
    details: [
      "Loan approval unlikely",
      "May require a guarantor or collateral",
      "Significantly higher interest rates if approved",
    ],
  },
  {
    label: "Poor",
    min: 0,
    max: 579,
    color: "text-red-600",
    details: [
      "Loan approval unlikely",
      "May require a guarantor or collateral",
      "Significantly higher interest rates if approved",
    ],
  },
];
