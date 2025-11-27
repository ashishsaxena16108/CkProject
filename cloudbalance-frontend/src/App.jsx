import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Usersboard from './pages/admin/Usersboard'
import AddUserBoard from './pages/admin/AddUserBoard'
import AccountsBoard from './pages/admin/AccountsBoard'
import OnboardAccountsBoard from './pages/admin/OnboardAccountsBoard'
import { ToastContainer } from 'react-toastify'
import ResourcesBoard from './pages/ResourcesBoard'
import CostBoard from './pages/CostBoard'
import NotFound from './pages/NotFound'

function App() {
  
  return (
    <>
    <BrowserRouter>
     <Routes>
       <Route path='/login' element={<Login/>}/>
       <Route path='/' element={<ProtectedRoute roleNeeded={'*'}><Home/></ProtectedRoute>}>
       <Route path='/admin' element={<ProtectedRoute roleNeeded={'admin'}><Dashboard/></ProtectedRoute>}>
         <Route path='/admin/users' element={<ProtectedRoute roleNeeded={'admin'}><Usersboard/></ProtectedRoute>}/>
         <Route path='/admin/adduser' element={<ProtectedRoute roleNeeded={'admin'}><AddUserBoard/></ProtectedRoute>}/>
         <Route path='/admin/accounts' element={<ProtectedRoute roleNeeded={'admin'}><AccountsBoard/></ProtectedRoute>}/>
         <Route path='/admin/accounts/onboarding' element={<ProtectedRoute roleNeeded={'admin'}><OnboardAccountsBoard/></ProtectedRoute>}/>
         <Route path='/admin/resources' element={<ProtectedRoute roleNeeded={'admin'}><ResourcesBoard/></ProtectedRoute>}/>
         <Route path='/admin/costexplorer' element={<ProtectedRoute roleNeeded={'admin'}><CostBoard/></ProtectedRoute>}/>
       </Route>
       <Route path='/user' element={<ProtectedRoute roleNeeded={'user'}><Dashboard/></ProtectedRoute>}>
         <Route path='/user/resources' element={<ProtectedRoute roleNeeded={'user'}><ResourcesBoard/></ProtectedRoute>}/>
         <Route path='/user/costexplorer' element={<ProtectedRoute roleNeeded={'user'}><CostBoard/></ProtectedRoute>}/>
       </Route>
       </Route>
       <Route path='*' element={<NotFound/>}/>
     </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>
  )
}

export default App
