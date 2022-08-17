import StateModule from "../module";
import LocalStorage from "../../services/local-storage";
import skip from "../../utils/skip";

const localStorageService = new LocalStorage();

class PaginationState extends StateModule {

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
        return {
            limit: 10,
            current: localStorageService.getCurrentPage(),
            skip: localStorageService.getCurrentSkip(),
        };
    }


    changePage(page) {
        if (page) {
            const newSkip = skip(page, this.store.getState().pagination.limit);

            localStorageService.setCurrentPage(page);
            localStorageService.setCurrentSkip(newSkip);

            this.setState({
                ...this.store.getState().pagination,
                current: page,
                skip: newSkip,
            })
        }
    }
}

export default PaginationState;