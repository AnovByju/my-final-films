import './globals.css';

export const metadata = {
  title: 'myFinalFilms',
  description: 'Discover your film tonight with TikTok-style scrolling and Tinder-style elimination',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
