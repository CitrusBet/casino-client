import "./globals.css";

export const metadata = {
  title: "Casino - Play Your Favorite Games",
  description: "Premium online casino with slots, table games and live dealers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
