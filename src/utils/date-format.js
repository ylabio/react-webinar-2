var options = {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
};

export default function dateFormat(value) {
	var date = new Date(value);
	var str = date.toLocaleString('ru-RU', options);
	return str.replace(/г.,/i, 'в');
}
