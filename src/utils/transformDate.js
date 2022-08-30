const addZeroToNumber = (number) => {
	return (number > 0 && number < 10) ? `0${number}` : number;
};

const transformMonth = (monthNumber) => {
	switch (monthNumber) {
		case 1:
			return 'января';
			break;

		case 2:
			return 'февраля';
			break;

		case 3:
			return 'марта';
			break;

		case 4:
			return 'апреля';
			break;

		case 5:
			return 'мая';
			break;

		case 6:
			return 'июнья';
			break;

		case 7:
			return 'июля';
			break;

		case 8:
			return 'августа';
			break;

		case 9:
			return 'сентября';
			break;

		case 10:
			return 'октября';
			break;

		case 11:
			return 'ноября';
			break;

		case 12:
			return 'декабря';
			break;
	}
};

export default function transformDate(stringDate){
	const date = new Date(stringDate);
	const numberOfMonth = date.getUTCDate();
	const month = date.getUTCMonth() + 1;
	const hour = date.getHours();
	const minutes = date.getUTCMinutes();

	return `${numberOfMonth} ${transformMonth(month)} ${date.getFullYear()} в ${addZeroToNumber(hour)}:${addZeroToNumber(minutes)}`;
}