const month = {
    '01': 'января',
    '02': 'февраля',
    '03': 'марта',
    '04': 'апреля',
    '05': 'мая',
    '06': 'июня',
    '07': 'июля',
    '08': 'августа',
    '09': 'сентября',
    '10': 'октября',
    '11': 'ноября',
    '12': 'декабря'
}

export default function dataParser(str){
    let [date, time] = [str.split('.')[0].split('T')[0], str.split('.')[0].split('T')[1]]

    return `${date.split('-')[2]} ${month[date.split('-')[1]]} ${date.split('-')[0]} в ${time.substring(0, 5)}`

}

