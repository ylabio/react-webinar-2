import StateModule from '../module';

class PaginationState extends StateModule {
  initState() {
    return {
      totalPages: 0,
      currentPage: 1
    };
  }

  setCurrentPage(pageNumber) {
    this.setState(
      {
        ...this.getState(),
        currentPage: pageNumber
      },
      'назначение текущей страницы'
    );
  }

  setTotalPages(total) {
    this.setState(
      {
        ...this.getState(),
        totalPages: total
      },
      'назначение всего страниц'
    );
  }
}

export default PaginationState;
