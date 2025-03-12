import './globals.css';

export const metadata = {
  title: 'Dog Adoption App',
  description: 'Find your perfect canine companion',
  viewport: 'width=device-width, initial-scale=1',
};

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Dog Adoption App</h1>
          </div>
        </header>
        <main className="min-h-screen bg-gray-200">
          {children}
        </main>
        <footer className="bg-gray-400 p-4 border-t">
          <div className="container mx-auto text-center text-gray-800">
            <p>© 2025 Dog Adoption App</p>
          </div>
        </footer>
      </body>
    </html>
  );
};
export default RootLayout;