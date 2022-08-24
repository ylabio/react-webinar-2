import { useEffect } from 'react';

export default function useUninit(callback, depends = []) {
  useEffect(() => {
    return callback;
  }, depends);
}
