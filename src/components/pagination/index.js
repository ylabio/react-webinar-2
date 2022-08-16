import React from "react";
import propTypes from 'prop-types';
import { cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination(props) {

    const cn = bem("Pagination");

    const list = React.useMemo(() => {
        if ([1,2].includes(props.currentPage)) {
            return [1, 2, 3, "...", props.totalPages]
        }
        if (props.currentPage === 3) {
            return [1, 2, 3, 4, "...", props.totalPages]
        }
        if ([props.totalPages-1, props.totalPages].includes(props.currentPage)) {
            return [1, "...", props.totalPages-2, props.totalPages-1, props.totalPages]
        }
        if (props.currentPage === props.totalPages-2) {
            return [1, "...", props.totalPages-3, props.totalPages-2, props.totalPages-1, props.totalPages]
        }

        return [1, "...", props.currentPage-1, props.currentPage, props.currentPage+1, "...", props.totalPages ]
    }, [props.currentPage, props.totalPages])

    return(
        <div className={cn()}>
            {
                list.map((page, id) => (
                    <div className={page === props.currentPage
                        ? cn("selected")
                        : page === "..."
                        ? cn("spacer") : cn('page')} key={id}
                    onClick={page === "..." ? null : () => {
                        props.onPageChange(page)
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
