export default function createRange(count, current) {
	const total = Math.ceil(count / 10);
	const range = [];

	if (total <= 5) {
		for (let i = 1; i <= total; i++) {
			range.push(i);
		}
		return range;
	}

	if (current < 3) {
		range.push(1,2,3);
		range.push("...");
		range.push(total);
		return range;
	}

	if (current === 3) {
		range.push(1,2,3,4);
		range.push("...");
		range.push(total);
		return range;
	}

	if (current === total - 2) {
		range.push(1);
		range.push("...");
		for (let i = total - 3; i <= total; i++) {
			range.push(i);
		}
		return range;
	}

	if (current === total - 1 || current === total) {
		range.push(1);
		range.push("...");
		for (let i = total - 2; i <= total; i++) {
			range.push(i);
		}
		return range;
	}

	//для всех остальных случаев
	range.push(1);
	range.push("...");
	for (let i = current - 1; i <= current + 1; i++) {
		range.push(i);
	}
	range.push("...");
	range.push(total);
	return range;
};