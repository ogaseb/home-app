import { DefaultTheme } from "styled-components";

const screens = {
	wideDesktop: 1920,
	desktop: 1280,
	smallDesktop: 1024,
	largeTablet: 768,
	largeHandset: 480,
	mediumHandset: 360,
	smallHandset: 320,
};

const mediaQuery = (key: keyof typeof screens) => {
	return (style: TemplateStringsArray | string) =>
		`@media (max-width: ${screens[key]}px) { ${style} }`;
};

const theme: DefaultTheme = {
	appBarHeight: "64px",
	colors: {
		primary: "#0A2647",
		secondary: "#144272",
		tertiary: "#205295",
		black: "#000000",
		white: "#FFFFFF",
		success: "#4BB543",
		error: "#ff3333",
	},
};

export { theme, mediaQuery, screens };
