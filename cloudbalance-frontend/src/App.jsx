import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Usersboard from './pages/admin/Usersboard'
import AddUserBoard from './pages/admin/AddUserBoard'
import AccountsBoard from './pages/admin/AccountsBoard'
import OnboardAccountsBoard from './pages/admin/OnboardAccountsBoard'
import { ToastContainer } from 'react-toastify'
import ResourcesBoard from './pages/ResourcesBoard'
import CostBoard from './pages/CostBoard'
import NotFound from './pages/NotFound'
import Loader from './components/Loader'
import { useSelector } from 'react-redux'

function App() {
  const {role} = useSelector(state=>state.auth.user)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<ProtectedRoute roleNeeded={[]}><Home /></ProtectedRoute>}>
          <Route index element={role==='ADMIN'|| role==='READ_ONLY'?<Navigate to="/admin/users" replace/>:<Navigate to="/user/costexplorer" replace/>}/>
          <Route path='/admin' element={<ProtectedRoute roleNeeded={['ADMIN','READ_ONLY']}><Dashboard /></ProtectedRoute>}>
            <Route index element={<Navigate to="users" replace />} />
            <Route path='users' element={<Usersboard />} />
            <Route path='adduser' element={<AddUserBoard />} />
            <Route path='accounts' element={<AccountsBoard />} />
            <Route path='accounts/onboarding' element={<OnboardAccountsBoard />} />
            <Route path='resources' element={<ResourcesBoard />} />
            <Route path='costexplorer' element={<CostBoard />} />
          </Route>
          <Route path='/user' element={<ProtectedRoute roleNeeded={['USER']}><Dashboard /></ProtectedRoute>}>
            <Route index element={<Navigate to="costexplorer" replace />} />
            <Route path='resources' element={<ResourcesBoard />} />
            <Route path='costexplorer' element={<CostBoard />} />
          </Route>
          </Route>
          {/* 5. Catch-All */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Loader />
      <ToastContainer />
    </>
  )
}

export default App
