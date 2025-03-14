// app/layout.js
import Providers from '../components/Providers';
import SiteNavigation from '../components/SiteNavigation';
import ErrorBoundary from '../components/ErrorBoundary';
import './globals.css';

export const metadata = {
  title: 'Dog Adoption App',
  description: 'Find your perfect canine companion',
  viewport: 'width=device-width, initial-scale=1',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header role="banner" className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">Dog Adoption App</h1>
            </div>
          </header>
          <SiteNavigation />
          <main role="main" className="min-h-screen bg-gray-200">
            <ErrorBoundary>{children}</ErrorBoundary>
          </main>
          <footer role="contentinfo" className="bg-gray-400 p-4 border-t">
            <div className="container mx-auto text-center text-gray-800">
              <p>© 2025 Dog Adoption App</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;