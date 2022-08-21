import { useState } from "react";

export default function useInput(initialState) {
	const [value, setValue] = useState(initialState);

	const onChange = (e) => setValue(e.target.value);

	return {value, setValue, onChange};
}