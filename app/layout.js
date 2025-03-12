import './globals.css';

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <head></head>
      <body>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
};
export default RootLayout;