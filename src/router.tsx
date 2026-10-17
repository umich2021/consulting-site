import { createBrowserRouter } from 'react-router'
import { RootLayout } from './routes/RootLayout'
import { HomePage } from './routes/HomePage'
import { WorkPage } from './routes/WorkPage'
import { ProcessPage } from './routes/ProcessPage'
import { AboutPage } from './routes/AboutPage'
import { ContactPage } from './routes/ContactPage'
import { NotFoundPage } from './routes/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'work', Component: WorkPage },
      { path: 'process', Component: ProcessPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
