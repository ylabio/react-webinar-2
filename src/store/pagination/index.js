import StateModule from '../module';

class PaginationState extends StateModule {
  initState() {
    return {
      totalItems: 0,
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

  setTotalItems(total) {
    this.setState(
      {
        ...this.getState(),
        totalItems: total
      },
      'назначение общего количества страниц'
    );
  }
}

export default PaginationState;
