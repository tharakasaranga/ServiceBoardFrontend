import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Service Request Board",
  description: "Mini service request platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}