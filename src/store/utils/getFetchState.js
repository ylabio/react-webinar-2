const getFetchState = (state) => state === 'error'
  ? {
    pending: false,
    error: true,
    ok: false,
  }
  : state === 'ok'
  ? {
    pending: false,
    error: false,
    ok: true,
  }
  : state === 'pending'
  ? {
    pending: true,
    error: false,
    ok: false,
  }
  : {};

export default getFetchState;
