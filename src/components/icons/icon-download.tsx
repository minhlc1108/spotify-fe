import { SVGProps } from "react";

const DownloadIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => {
	return (
		<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" {...props}>
			<path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path>
			<path d="M12 6.05a1 1 0 0 1 1 1v7.486l1.793-1.793a1 1 0 1 1 1.414 1.414L12 18.364l-4.207-4.207a1 1 0 1 1 1.414-1.414L11 14.536V7.05a1 1 0 0 1 1-1z"></path>
		</svg>
	);
};

export default DownloadIcon;
