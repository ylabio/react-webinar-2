const counterBtn = (e, loadPage) => {
    const { selected } = e.target.dataset;
    loadPage(+selected);

    console.log('loadpage');

    document.querySelectorAll('.page-').forEach(btn => {
        btn.classList.remove("Active");
        btn.classList.remove("Next");
        btn.classList.remove("Previous");
    })

    e.target.classList.add("Active");
    if (e.target.nextSibling && !e.target.nextSibling.classList.contains('points')) e.target.nextSibling.classList.add("Next");
    if (e.target.previousSibling && !e.target.previousSibling.classList.contains('points') &&
        !e.target.previousSibling.classList.contains('points-end')) e.target.previousSibling.classList.add('Previous');


    if (+selected > 2) document.querySelector('.points').classList.add('show')
    else document.querySelector('.points').classList.remove('show')

    if (+selected > 9) document.querySelector('.points-end').classList.add('points')
    else document.querySelector('.points-end').classList.remove('points')

    if (+selected === 0) {
        e.target.nextSibling.nextSibling.classList.add("Next");
        e.target.nextSibling.nextSibling.nextSibling.classList.add("Next");
    }

    if (+selected === 12) {
        e.target.previousSibling.previousSibling.classList.add("Previous");
        e.target.previousSibling.previousSibling.previousSibling.classList.add("Previous");
    }




}


export default counterBtn; 