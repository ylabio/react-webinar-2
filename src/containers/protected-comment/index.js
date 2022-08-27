import React, { useCallback, useEffect } from 'react';
import propTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import CommentNotice from '../../components/comment-notice';

function ProtectedComment({ children, formType, openForm, articleId }) {
	const navigate = useNavigate();
	const location = useLocation();

	const select = useSelector((state) => ({
		exists: state.session.exists,
		waiting: state.session.waiting,
	}));

	function onSignIn() {
		navigate('/login', { state: { back: location.pathname } });
	}

	function handleOpenForm() {
		openForm(articleId);
	}

	return !select.exists || select.waiting ? (
		<CommentNotice
			formType={formType}
			onSignIn={onSignIn}
			handleOpenForm={handleOpenForm}
		/>
	) : (
		children
	);
}

ProtectedComment.propTypes = {
	children: propTypes.node,
	formType: propTypes.string.isRequired,
	openForm: propTypes.func.isRequired,
	articleId: propTypes.string.isRequired,
};

ProtectedComment.defaultProps = {
	openForm: () => {},
};

export default React.memo(ProtectedComment);
