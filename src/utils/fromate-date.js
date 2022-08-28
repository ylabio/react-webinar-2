export default function formateDate(number) {
    const date = new Date(number)
    let formateDate = new Intl.DateTimeFormat("ru", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    let formateTime = new Intl.DateTimeFormat("ru", {
        hour: "numeric", 
        minute: "numeric"
      });
    return `${formateDate.format(date).slice(0, -3)} в ${formateTime.format(date)}`
}