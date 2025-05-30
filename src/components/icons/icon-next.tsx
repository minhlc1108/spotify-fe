import type { SVGProps } from "react";
const NextIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			shapeRendering="geometricPrecision"
			textRendering="geometricPrecision"
			imageRendering="optimizeQuality"
			fillRule="evenodd"
			clipRule="evenodd"
			viewBox="0 0 511 510.43"
			{...props}
		>
			<path
				fillRule="nonzero"
				d="M286.56 293.22c28.24-25.15 27.48-47.55 0-73.04L60.77 9.54C36.97-10.38-.08 1.15 0 41.73v423.76c2.66 43.51 39.44 55.73 64.14 35.32l222.42-207.59zm114.38 216.7h81.88c15.51 0 28.18-12.76 28.18-28.21V28.94C511 13.52 498.24.76 482.82.76h-81.88c-15.45 0-28.21 12.67-28.21 28.18v452.77c0 15.55 12.69 28.21 28.21 28.21z"
			/>
		</svg>
	);
};

export default NextIcon;
