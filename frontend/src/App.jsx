import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ModalsProvider } from '@mantine/modals';
import Dashboard from './dashboard/Dashboard'; 
function App() {
  return (
    <MantineProvider> 
      <ModalsProvider>
            <Notifications />
              <BrowserRouter>
                <Routes>
                  <Route path="/*" element={<Dashboard />} />
                </Routes>
          </BrowserRouter>
        </ModalsProvider>
        </MantineProvider>
  );
}

export default App;