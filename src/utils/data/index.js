const defineDate = (date) => {
    const dataDayMonthYear = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
    const dataHourMinute = {
        hour: 'numeric',
        minute: 'numeric',
    };

    return `${new Date(date).toLocaleString('ru-RU', dataDayMonthYear)
        .slice(0, -3)} в ${new Date(date).toLocaleString('ru-RU', dataHourMinute)}`;
};

export default defineDate;