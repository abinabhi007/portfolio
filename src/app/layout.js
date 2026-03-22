import CustomCursor from "../../components/CustomCursor/CustomCursor";
import PortfolioLoader from "../../components/PortfolioLoader/PortfolioLoader";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/globals.scss";


export const metadata = {
  title: 'Abin HN — Software Developer',
  description:
    'Associate Software Engineer building scalable web applications with clean code and modern UI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
      </body>
    </html>
  );
}
