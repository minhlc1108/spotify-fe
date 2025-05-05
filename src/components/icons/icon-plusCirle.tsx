import type { SVGProps } from "react";

const PlusCirle = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg
		data-encore-id="icon"
		role="img"
		aria-hidden="true"
		className="e-9812-icon e-9812-baseline"
		viewBox="0 0 16 16"
		{...props}
	>
		<path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
		<path d="M11.75 8a.75.75 0 0 1-.75.75H8.75V11a.75.75 0 0 1-1.5 0V8.75H5a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 1.5 0v2.25H11a.75.75 0 0 1 .75.75z"></path>
	</svg>
);

export default PlusCirle;
