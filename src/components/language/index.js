import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Language({
	onLanguageRu,
	onLanguageEn,
	onLanguageIt,
	currentLanguage,
}) {
	const cn = bem('Language');

	const languages = [
		{ code: 'ru', onClick: onLanguageRu, title: 'Ru' },
		{ code: 'en', onClick: onLanguageEn, title: 'En' },
		{ code: 'it', onClick: onLanguageIt, title: 'It' },
	];

	return (
		<div className={cn()}>
			{languages.map((language) => (
				<button
					className={cn(
						'btn',
						currentLanguage === language.code && { active: true },
					)}
					key={language.code}
					onClick={language.onClick}
				>
					{language.title}
				</button>
			))}
		</div>
	);
}

Language.propTypes = {
	onLanguageRu: propTypes.func.isRequired,
	onLanguageEn: propTypes.func.isRequired,
	onLanguageIt: propTypes.func.isRequired,
	currentLanguage: propTypes.string.isRequired,
};

Language.defaultProps = {
	onLanguageRu: () => {},
	onLanguageEn: () => {},
	onLanguageIt: () => {},
};

export default React.memo(Language);
