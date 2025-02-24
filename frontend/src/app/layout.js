import "./globals.css";

export const metadata = {
  title: "To-Do App",
  description: "Simple To-Do App with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
