import Home from './pages/home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import InvoiceInfo from './components/invoiceInfo/InvoiceInfo'
import invoiceSlice from './features/invoiceSlice'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  const onDelete = (id) => {
    dispatch(invoiceSlice.actions.deleteInvoice({id : id}))
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/invoice',
          element: <InvoiceInfo onDelete={onDelete} />
        }
      ]
    }
  ])
  return <RouterProvider router={router}/>
}

export default App