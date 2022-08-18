import React, {useMemo, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css'

function PageControls(props) {
    const cn = bem('PageControls');
    const [page, setPage] = useState(1)
    const pageLayout = useMemo(() => {
        let pages = []
        for(let renderingPage = props.minPage; renderingPage <= props.maxPage; renderingPage++) {

            if(renderingPage === props.minPage
                || renderingPage === props.maxPage
                || renderingPage >= page-1 && renderingPage <= page+1
                || page < props.minPage+2 && renderingPage <= props.minPage+2
                || page > props.maxPage-2 && renderingPage >= props.maxPage-2) {
                pages.push(<button key={renderingPage}
                                   className={renderingPage === page ? cn('page-selected') : cn('page')}
                                   onClick={() => {
                                       props.onPageChange(renderingPage)
                                       setPage(renderingPage)
                                   }
                                   }>{renderingPage}</button>)
            }
            if(renderingPage === props.minPage+1 && page >= props.minPage+3
                || renderingPage === props.maxPage-1 && page <= props.maxPage-3) {
                pages.push(<p key={renderingPage} className={cn('delimiter')}>...</p> )
            }
        }
        return pages
    }, [props.minPage, props.maxPage, page, props.onPageChange])
    return (
        <div className={cn()}>
            <div className={cn('container')}>
                {pageLayout}
            </div>
        </div>
    )
}

PageControls.propTypes = {
    minPage: propTypes.number,
    maxPage: propTypes.number,
    onPageChange: propTypes.func.isRequired
}

PageControls.defaultProps = {
    minPage: 1,
    maxPage: 1,
}

export default React.memo(PageControls);