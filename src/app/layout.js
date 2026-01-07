
import "./globals.css";
import {
  Cinzel,
  Cinzel_Decorative,
  Playfair_Display,
  Bodoni_Moda,
  Prata,
  Libre_Bodoni,
  EB_Garamond,
  Cormorant_Garamond,
  Cormorant_SC,
  Spectral,
  Forum,
  Marcellus,
  Cardo,
  Alegreya,
  Crimson_Pro,
  Libre_Baskerville,
} from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cinzel',
});

const cormorantSC = Cormorant_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant-sc',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-libre-baskerville',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bodoni',
});

const prata = Prata({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-prata',
});

const libreBodoni = Libre_Bodoni({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-libre-bodoni',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-eb-garamond',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-spectral',
});

const forum = Forum({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-forum',
});

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marcellus',
});

const cardo = Cardo({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cardo',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-alegreya',
});

const crimson = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-crimson',
});



export const metadata = {
  title: "Luke & Lavinia | 14th February 2026",
  description: "It’s our wedding!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cormorantSC.className}
      >
        {children}
      </body>
    </html>
  );
}
