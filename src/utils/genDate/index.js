export default function genDate(date) {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
    }

    return new Intl.DateTimeFormat('ru-RU', options).format(date);


}