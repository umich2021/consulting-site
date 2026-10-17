import { createBrowserRouter } from 'react-router'
import { RootLayout } from './routes/RootLayout'
import { HomePage } from './routes/HomePage'
import { NotFoundPage } from './routes/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
