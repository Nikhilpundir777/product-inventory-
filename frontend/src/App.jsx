
import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from 'sonner';


function App() {
  

  return (
    <>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Navbar />
    <Toaster />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/create' element={<CreatePage />} />
    </Routes>
    </ThemeProvider>
       
    </>
  )
}

export default App
