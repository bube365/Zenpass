import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import FileUpload from "../components/common/FileUpload";
import {
  useFetchDocumentsQuery,
  useGetCreditScoreMutation,
} from "../store/api/authApi";
import { Loader } from "../components/common/Loader";

export default function ShareCreditData() {
  const navigate = useNavigate();

  const { data, isLoading } = useFetchDocumentsQuery(undefined, {
    pollingInterval: 120000, // poll every 2 minutes
  });

  const [getCreditScore, { isLoading: loadingScore }] =
    useGetCreditScoreMutation();

  const [statusState, setStatusState] = useState({
    allProcessed: false,
    anyFailed: false,
    showLoader: true,
  });

  useEffect(() => {
    if (data) {
      if (data?.data.length !== 3) {
        setStatusState({
          allProcessed: false,
          anyFailed: false,
          showLoader: true,
        });
        return;
      }

      const statuses = data?.data.map((doc) => doc.status.toLowerCase());
      const allProcessed = statuses.every((s) => s === "processed");
      const anyFailed = statuses.some((s) => s === "failed");
      const allPending = statuses.every((s) => s === "pending");

      setStatusState({
        allProcessed,
        anyFailed,
        showLoader: allPending || (!allProcessed && !anyFailed),
      });
    }
  }, [data]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // businessName: "",
    bvn1: "",
    salesReceipt: null,
    salesRecords: null,
    bankStatement: null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (name, file) => {
    setFormData((prev) => ({ ...prev, [name]: file }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    // if (!formData.businessName.trim())
    //   newErrors.businessName = "Business name is required";
    if (!formData.bvn1.trim() || formData.bvn1.length !== 11)
      newErrors.bvn1 = "Please enter a valid 11-digit BVN";
    if (statusState?.anyFailed)
      newErrors.salesReceipt = "Validation failed. Please reupload document";
    if (data?.data?.length < 3)
      newErrors.salesRecords =
        "Upload all required documents before proceeding";
    // if (!formData.bankStatement)
    //   newErrors.bankStatement = "Bank statement is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setIsSubmitting(true);
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     navigate("/credit-score");
  //   }, 2000);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const payload = {
        requestedAmount: 2500000,
      };

      const response = await getCreditScore(payload).unwrap();

      navigate("/credit-score");
    } catch (error) {
      console.error("Credit score error:", error);
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="p-6 flex items-center space-x-4 border-b border-gray-100">
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

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Share Your Credit Data
          </h1>
          <p className="text-gray-600">
            Provide the following information to accurately calculate your
            credit score
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <Input
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleInputChange}
            placeholder="Enter your business name"
            required
            error={errors.businessName}
          /> */}

          <div>
            <Input
              label="Bank Verification Number (BVN)"
              name="bvn1"
              value={formData.bvn1}
              onChange={handleInputChange}
              placeholder="Enter your 11-digit BVN"
              maxLength={11}
              required
              error={errors.bvn1}
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData?.bvn1?.length}/11 digits
            </p>
          </div>

          <FileUpload
            label="Sales Receipts (12 months minimum)"
            description="PDF, PNG, JPG (Max 10MB)"
            accept=".pdf,.png,.jpg,.jpeg"
            maxSize={10}
            name="salesReceipt"
            documentType="SALES_RECEIPT"
            onChange={(file) => handleFileChange("salesReceipt", file)}
            fileUrl={
              data?.data.find((d) => d.documentType === "SALES_RECEIPT")
                ?.fileUrl || formData.salesReceipt
            }
            docName={
              data?.data.find((d) => d.documentType === "SALES_RECEIPT")
                ?.filename || ""
            }
            error={errors.salesReceipt}
          />

          <FileUpload
            label="Sales Records (12 months minimum)"
            description="PDF, Excel, CSV (Max 15MB)"
            accept=".pdf,.xls,.xlsx,.csv"
            maxSize={15}
            name="salesRecords"
            documentType="SALES_RECORD"
            onChange={(file) => handleFileChange("salesRecords", file)}
            fileUrl={
              data?.data.find((d) => d.documentType === "SALES_RECORD")
                ?.fileUrl || formData.salesRecords
            }
            docName={
              data?.data.find((d) => d.documentType === "SALES_RECORD")
                ?.filename || ""
            }
            error={errors.salesRecords}
          />

          <FileUpload
            label="Bank Statement (12 months minimum)"
            description="PDF only (Max 20MB)"
            accept=".pdf"
            maxSize={20}
            name="bankStatement"
            documentType="BANK_STATEMENT"
            onChange={(file) => handleFileChange("bankStatement", file)}
            fileUrl={
              data?.data.find((d) => d.documentType === "BANK_STATEMENT")
                ?.fileUrl || formData.bankStatement
            }
            docName={
              data?.data.find((d) => d.documentType === "BANK_STATEMENT")
                ?.filename || ""
            }
            error={errors.bankStatement}
          />

          <div className="max-w-md mx-auto mt-10 text-center">
            {isLoading || statusState.showLoader ? (
              <Loader text="Validating your documents..." />
            ) : (
              <>
                {statusState.anyFailed && (
                  <p className="text-red-500 mb-4 font-semibold">
                    Data scraping failed. Please try uploading the document
                    again.
                  </p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isSubmitting}
                  disabled={isSubmitting || !formData.bvn1}
                  className="text-lg py-4 mt-8"
                >
                  {statusState.anyFailed
                    ? "Retry Upload"
                    : "Continue to Scoring"}
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
