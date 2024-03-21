import localFont from "next/font/local";

const champBlack = localFont({
  src: "../public/fonts/Champ-Black.ttf",
});

// const neueMontrealSemiBold = localFont({
//   src: "../fonts/PPNeueMontreal-SemiBold.otf",
// });

// const neueMontrealBold = localFont({
//   src: "../fonts/PPNeueMontreal-Bold.otf",
// });

export const champBlackFontFamily = champBlack.style.fontFamily;
// export const semiBoldFont = neueMontrealSemiBold.style.fontFamily;
// export const boldFontFamily = neueMontrealBold.style.fontFamily;
