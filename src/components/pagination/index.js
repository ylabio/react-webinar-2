import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Pagination({totalNumberOfPage, currentPage, onSelect}) {
	const cn = bem('Pagination');

	const NumberPage = () => {
		let i = 0;
		const pages = [];
		if( totalNumberOfPage <= 6) {
			while (i < totalNumberOfPage) {
				pages.push(
					<li 
						key={i} 
						className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
						value={i} 
						onClick={(e) => onSelect(e)}>
						{i+1}
					</li>
				);
				i++;
			}
		}

		if(currentPage < 2 && totalNumberOfPage > 6) {
			while (i < 3) {
				pages.push(
					<li 
						key={i} 
						className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
						value={i} 
						onClick={(e) => onSelect(e)}>
						{i+1}
					</li>
				);
				i++;
			}

			pages.push(
				<li 
					key={i} 
					className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
					value={i}>
					...
				</li>
			);

			pages.push(
				<li 
					key={Math.ceil(totalNumberOfPage) - 1} 
					className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
					value={Math.ceil(totalNumberOfPage) -1} 
					onClick={(e) => onSelect(e)}>
					{Math.ceil(totalNumberOfPage)}
				</li>
			);
		}
		//
		if(currentPage === 2 && totalNumberOfPage > 6) {
			while (i < 4) {
				pages.push(
					<li 
						key={i} 
						className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
						value={i} 
						onClick={(e) => onSelect(e)}>
						{i+1}
					</li>
				);
				i++;
			}

			pages.push(
				<li 
					key={i} 
					className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
					value={i}>
					...
				</li>
			);

			pages.push(
				<li 
					key={Math.ceil(totalNumberOfPage) - 1} 
					className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
					value={Math.ceil(totalNumberOfPage) - 1}
					onClick={(e) => onSelect(e)}>
					{Math.ceil(totalNumberOfPage)}
				</li>
			);
		}

		if(currentPage > 2 && currentPage < Math.ceil(totalNumberOfPage) - 3 && totalNumberOfPage > 6) {
			pages.push(
				<li 
					key={i} 
					className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
					value={i}
					onClick={(e) => onSelect(e)}>
					{i+1}
				</li>
			);

			pages.push(
				<li 
					key={i+1} 
					className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
					value={i+1}>
					...
				</li>
			);

			i = currentPage - 1;
			while (i < currentPage + 2) {
				pages.push(
					<li 
						key={i} 
						className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
						value={i}
						onClick={(e) => onSelect(e)}>
						{i+1}
					</li>
				);
				i++;
			}

			pages.push(
				<li 
					key={i} 
					className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
					value={i}>
					...
				</li>
			);

			pages.push(
				<li 
					key={Math.ceil(totalNumberOfPage) - 1} 
					className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
					value={Math.ceil(totalNumberOfPage) - 1}
					onClick={(e) => onSelect(e)}>
					{Math.ceil(totalNumberOfPage)}
				</li>
			);
		}

		if(currentPage >= Math.ceil(totalNumberOfPage) - 3 && totalNumberOfPage > 6) {
			pages.push(
				<li 
					key={i} 
					className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
					value={i}
					onClick={(e) => onSelect(e)}>
					{i+1}
				</li>
			);

			pages.push(
				<li 
					key={i+1} 
					className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
					value={i+1}>
					...
				</li>
			);

			i = Math.ceil(totalNumberOfPage) - 4
			while (i <= Math.ceil(totalNumberOfPage) - 1) {
				pages.push(
					<li 
						key={i} 
						className={cn('item') + ` ${currentPage === i ? cn('item_active') : ''}`}
						value={i}
						onClick={(e) => onSelect(e)}>
						{i+1}
					</li>
				);
				i++;
			}
		}
		return pages;
	}

	return(
		<ul className={cn()}>
			<NumberPage/>
		</ul>
	)
}

export default React.memo(Pagination);