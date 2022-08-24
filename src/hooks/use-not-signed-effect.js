import {useEffect} from 'react';
import {useIsInitialRender} from './use-is-initial-render';
import useSelector from './use-selector';

export function useNotSignedEffect(callback, deps = []) {
  const isSigned = useSelector(state => state.auth.isSigned);
  const isInit = useIsInitialRender();
  deps = deps.concat(isSigned);

  useEffect(() => {
    if (!isSigned && !isInit()) {
      callback();
    }
  }, deps);
}
