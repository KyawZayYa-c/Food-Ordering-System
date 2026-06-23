import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ModalsProvider } from '@mantine/modals';
import Dashboard from './dashboard/Dashboard'; 
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import ProtectedRoute from './auth/ProtectedRoute';
import ClientPage from './client/Client';
function App() {
  return (
    <MantineProvider> 
      <ModalsProvider>
            <Notifications />
              <BrowserRouter>
                  <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    
                    {/* Admin Route */}
                    <Route element={<ProtectedRoute allowedRole="admin" />}>
                      <Route path="/dashboard/*" element={<Dashboard />} />
                    </Route>

                    {/* Customer Route */}
                    <Route element={<ProtectedRoute allowedRole="customer" />}>
                      <Route path="/*" element={<ClientPage />} />
                    </Route>
                  </Routes>
              </BrowserRouter>
        </ModalsProvider>
      </MantineProvider>
  );
}

export default App;