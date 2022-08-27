import useSelector from './use-selector';

export function useSession() {
  const select = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting
  }));

  return {
    isDenied: !select.waiting && !select.exists,
    isChecking: select.waiting || !select.exists
  };
}
