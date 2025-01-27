import ClientLayout from "./ClientLayout";

import "./globals.css";

export const metadata = {
  title: "The Movie Database - Clone",
  description: "A clone of the official TMDB site",
  twitter: {
    title: "The Movie Database - Clone",
    description: "A clone of the official TMDB site",
    creator: "@AyushKu32297268",
    card: "summary_large_image",
    images: {
      url: "https://tmdb-cloned.vercel.app/tmdb-logo.svg",
      alt: "TMDB - Clone Logo",
    },
  },
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
