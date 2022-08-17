const counterBtn = (e, loadPage) => {
    const { selected } = e.target.dataset;
    loadPage(+selected);

    document.querySelectorAll('.page-').forEach(btn => {
        btn.classList.remove("Active");
        btn.classList.remove("Next");
        btn.classList.remove("Previous");
    })

    e.target.classList.add("Active");
    if (e.target.nextSibling) e.target.nextSibling.classList.add("Next");
    if (e.target.previousSibling) e.target.previousSibling.classList.add('Previous');







}


export default counterBtn; 