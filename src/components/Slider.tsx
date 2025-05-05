import { useEffect, useRef } from "react";

interface TailwindSliderProps {
	value: number;
	max: number;
	onChange: (value: number) => void;
	onChangeEnd?: (val: number) => void;
}
export default function TailwindSlider({ value, max, onChange, onChangeEnd }: TailwindSliderProps): JSX.Element {
	const rangeRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (rangeRef.current && max > 0) {
			const percent = (value / max) * 100;
			rangeRef.current.style.setProperty("--progress", `${percent}%`);
		}
	}, [value, max]);

	return (
		<input
			ref={rangeRef}
			type="range"
			min={0}
			max={max}
			value={value}
			step={1}
			onChange={(e) => onChange(+e.target.value)}
			onPointerUp={(e) => {
				if (onChangeEnd) {
					const val = Number((e.target as HTMLInputElement).value);
					onChangeEnd(val);
				}
			}}
			className="custom-slider"
		/>
	);
}
