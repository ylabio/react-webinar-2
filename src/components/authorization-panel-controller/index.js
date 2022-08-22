import React, { useCallback } from 'react'

import AuthorizationPanel from '../authorization-panel'
import useSelector from '../../hooks/use-selector'
import useStore from '../../hooks/use-store'
import { useNavigate } from 'react-router-dom'

function AuthorizationPanelController() {
    const store = useStore();
    const navigate = useNavigate();
    const isAuthorized = useSelector(store => store.user.isAuthorized)
    const onLogout = useCallback(() => {
        store.get('user').logout()
        navigate('/')
    })

    const userName = useSelector(store => store.user?.userData?.profile?.name)

    return (
        <AuthorizationPanel isAuthorized={isAuthorized} userName={userName} onLogout={onLogout} />
    )
}

export default React.memo(AuthorizationPanelController);
