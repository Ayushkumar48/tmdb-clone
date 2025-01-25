import ClientLayout from "./ClientLayout";

import "./globals.css";

export const metadata = {
  title: "The Movie Database - Clone",
  description: "A clone of the official TMDB site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
