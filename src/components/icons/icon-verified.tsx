import type { SVGProps } from "react";
const VerifiedIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
	<svg data-encore-id="verifiedBadge" role="img" aria-hidden="false" viewBox="0 0 24 24" fill="#3B82F6" {...props}>
		<title>Verified account</title>
		<path
			stroke="white"
			strokeWidth="2"
			d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z"
		></path>
	</svg>
);
export default VerifiedIcon;
