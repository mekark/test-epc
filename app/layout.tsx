import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import Script from "next/script";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import SiteAmbientCubes from "../components/SiteAmbientCubes";
import "./globals.css";

const GTM_ID = "GTM-5SBMM86H";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald-face",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mekark Structures Pvt. Ltd.",
  description:
    "Mekark delivers industrial construction solutions for factories, plant infrastructure, utility systems, and manufacturing facilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body
        className={`${manrope.variable} ${oswald.variable} relative overflow-x-hidden font-sans antialiased`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SiteAmbientCubes />
        <FloatingWhatsApp />
        <div className="relative">{children}</div>
        <Script id="tawk-to" strategy="afterInteractive">
          {`
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/69fd7e65427c251c368c1e92/1jo33bfff';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })(); 
    `}
        </Script>
      </body>
    </html>
  );
}
