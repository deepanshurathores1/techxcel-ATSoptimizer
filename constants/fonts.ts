import { Inter, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

// Local font configuration for Satoshi
export const heading = localFont({
    src: [
        {
            path: "../public/fonts/Satoshi-Light.woff2", // Corrected path
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/Satoshi-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/Satoshi-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/Satoshi-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/Satoshi-Black.woff2",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--font-heading",
    display: "swap",
});

// Google font configuration for Inter
export const base = Inter({
    subsets: ["latin"],
    variable: "--font-base",
    display: "swap", // Optional: Ensures fonts are swapped smoothly
});

// Google font configuration for Instrument Serif
export const subheading = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-subheading",
    display: "swap", // Optional: Ensures fonts are swapped smoothly
});