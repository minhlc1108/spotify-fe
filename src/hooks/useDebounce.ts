import React, { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number): string => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Thiết lập timeout để cập nhật giá trị sau khi ngừng nhập
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Clear timeout nếu value thay đổi trước khi timeout hoàn tất
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};
