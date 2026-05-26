import CustomCursor from "../../components/CustomCursor/CustomCursor";
import PortfolioLoader from "../../components/PortfolioLoader/PortfolioLoader";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/globals.scss";
import { Analytics } from '@vercel/analytics/react';


export const metadata = {
  title: 'Abin HN — Software Developer',
  description:
    'Associate Software Engineer building scalable web applications with clean code and modern UI.',
  keywords: [
    'Software Engineer',
    'Web Developer',
    'React',
    'Next.js',
    'Frontend Developer',
    'Full Stack',
    'Abin HN',
  ],
  authors: [{ name: 'Abin HN' }],
  creator: 'Abin HN',
  openGraph: {
    title: 'Abin HN — Software Developer',
    description:
      'Associate Software Engineer building scalable web applications with clean code and modern UI.',
    url: 'https://abinhn.vercel.app',
    siteName: 'Abin HN Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Abin HN Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abin HN — Software Developer',
    description:
      'Associate Software Engineer building scalable web applications with clean code and modern UI.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="KtLaLBtFJCOj8LzSjMXgSRKdNwrkavXrmXr5xPCR17E" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem('theme');
                  var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.dataset.theme = theme;
                } catch (e) {
                  document.documentElement.dataset.theme = 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <PortfolioLoader />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
