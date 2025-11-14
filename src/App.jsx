import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Welcome from './pages/Welcome';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import RequiredCreditData from './pages/RequiredCreditData';
import ShareCreditData from './pages/ShareCreditData';
import CreditScore from './pages/CreditScore';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/credit-data"
            element={
              <ProtectedRoute>
                <RequiredCreditData />
              </ProtectedRoute>
            }
          />

          <Route
            path="/share-credit-data"
            element={
              <ProtectedRoute>
                <ShareCreditData />
              </ProtectedRoute>
            }
          />

          <Route
            path="/credit-score"
            element={
              <ProtectedRoute>
                <CreditScore />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
