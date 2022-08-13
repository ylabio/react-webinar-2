import React from "react";
import propTypes from 'prop-types'
import { cn as bem} from '@bem-react/classname'
import './style.css'
import useSelector from '../../utils/use-selector'
import useStore from '../../utils/use-store'

function Pagination() {

    const cn = bem("Pagination");
    const store = useStore();
    const { totalPages, currentPage } = useSelector(state => ({
        currentPage: state.catalog.currentPage,
        totalPages: state.catalog.totalPages
    }));

    React.useEffect(()=>{
        store.get('catalog').load(currentPage)
    }, [currentPage]);

    const list = React.useMemo(() => {
        if ([1,2].includes(currentPage)) {
            return [1, 2, 3, "...", totalPages]
        }
        if (currentPage === 3) {
            return [1, 2, 3, 4, "...", totalPages]
        }
        if ([totalPages-1, totalPages].includes(currentPage)) {
            return [1, "...", totalPages-2, totalPages-1, totalPages]
        }
        if (currentPage === totalPages-2) {
            return [1, "...", totalPages-3, totalPages-2, totalPages-1, totalPages]
        }

        return [1, "...", currentPage-1, currentPage, currentPage+1, "...", totalPages ]
    }, [currentPage, totalPages])

    return(
        <div className={cn()}>
            {
                list.map((page, id) => (
                    <div className={page === currentPage
                        ? cn("selected")
                        : page === "..."
                        ? cn("spacer") : cn('page')} key={id}
                    onClick={page === "..." ? null : () => {
                        store.get('catalog').setPage(page)
                    }
                    }
                    >
                        {page}
                    </div>))
            }
        </div>
    )
}


export default Pagination
