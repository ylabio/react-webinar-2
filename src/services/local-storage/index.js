export default class LocalStorage {
    setBasketValues(items, sum) {
        localStorage.setItem('basket', JSON.stringify(items));
        localStorage.setItem('sum', sum.toString());
        localStorage.setItem('amount', items.length.toString());
    }

    getSumValue() {
        return localStorage.getItem('sum') ? parseInt(localStorage.getItem('sum'), 10) : 0;
    }

    getAmountValue() {
        return localStorage.getItem('amount') ? parseInt(localStorage.getItem('amount'), 10) : 0;
    }

    getItems() {
        return localStorage.getItem('basket') && JSON.parse(localStorage.getItem('basket')).length ?
            JSON.parse(localStorage.getItem('basket')) : [];
    }

    setCurrentPage(page) {
        localStorage.setItem('page', page.toString());
    }

    setCurrentSkip(skip) {
        localStorage.setItem('skip', skip.toString());
    }

    getCurrentPage() {
        return localStorage.getItem('page') ? parseInt(localStorage.getItem('page'), 10) : 1;
    }

    getCurrentSkip() {
        return localStorage.getItem('skip') ? parseInt(localStorage.getItem('skip'), 10) : 0;
    }

    setLanguage(value) {
        localStorage.setItem('lang', value);
    }

    getLanguage() {
        return localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru';
    }
}