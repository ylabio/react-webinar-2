import {useEffect} from 'react';
import {useIsInitialRender} from './use-is-initial-render';
import useSelector from './use-selector';

export function useNotSignedEffect(callback, deps = []) {
  const {isSigned, isFetching} = useSelector(state => ({
    isSigned: state.session.isSigned,
    isFetching: state.session.isFetching
  }));

  const isInit = useIsInitialRender();
  deps = deps.concat(isSigned, isFetching, isInit);

  useEffect(() => {
    if (!isSigned && !isInit() && !isFetching) {
      callback();
    }
  }, deps);
}
