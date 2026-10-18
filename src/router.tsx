import { createBrowserRouter } from 'react-router'
import { RootLayout } from './routes/RootLayout'
import { HomePage } from './routes/HomePage'
import { WorkPage } from './routes/WorkPage'
import { ProcessPage } from './routes/ProcessPage'
import { AboutPage } from './routes/AboutPage'
import { ContactPage } from './routes/ContactPage'
import { StudioPage } from './routes/StudioPage'
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
      // Unlisted: places text over the hero video.
      { path: 'studio', Component: StudioPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
])
