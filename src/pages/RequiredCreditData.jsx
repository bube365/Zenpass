import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, Upload, Info } from 'lucide-react';
import Button from '../components/common/Button';
import Checkbox from '../components/common/Checkbox';
import { useState } from 'react';

export default function RequiredCreditData() {
  const navigate = useNavigate();
  const [agreeToShare, setAgreeToShare] = useState(false);

  const requirements = [
    {
      icon: <FileText className="text-red-500" size={24} />,
      title: 'Business Name',
      description: 'Your business name'
    },
    {
      icon: <FileText className="text-red-500" size={24} />,
      title: 'Bank Verification Number (BVN)',
      description: '11-digit'
    },
    {
      icon: <Upload className="text-red-500" size={24} />,
      title: 'Sales Receipt',
      description: 'At least 12 months • PDF, JPG, PNG • 10 MB max file size'
    },
    {
      icon: <Upload className="text-red-500" size={24} />,
      title: 'Sales Records',
      description: 'At least 12 months • PDF, Excel (XLS, XLSX), CSV • 15 MB max file size'
    },
    {
      icon: <Upload className="text-red-500" size={24} />,
      title: 'Bank Statement',
      description: 'At least 12 months • PDF only • 20 MB max file size'
    }
  ];

  const handleContinue = () => {
    if (agreeToShare) {
      navigate('/share-credit-data');
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
            Required Credit Data
          </h1>
          <p className="text-gray-600">
            We need the following information to accurately assess your creditworthiness
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {requirements.map((requirement, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-red-200 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                {requirement.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {requirement.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {requirement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Info className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">How we use your data:</p>
              <p>
                Your information is used solely for credit scoring and matching you
                with appropriate lenders.{' '}
                <span className="font-medium">We never sell your data to third parties.</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <Checkbox
            name="agreeToShare"
            checked={agreeToShare}
            onChange={(e) => setAgreeToShare(e.target.checked)}
            label={
              <span className="text-sm">
                I consent to share my data and allow Zenpass to process my data for
                scoring and lender matching. I have read and agree to the{' '}
                <a href="#" className="text-red-500 hover:text-red-600 font-medium">
                  Data Policy
                </a>
                .
              </span>
            }
          />
        </div>

        <Button
          onClick={handleContinue}
          variant="primary"
          fullWidth
          disabled={!agreeToShare}
          className="text-lg py-4"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
