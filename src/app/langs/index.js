import React, { useCallback, useState } from 'react'
import Languages from '../../components/languages'
import { getSupportedLangs } from '../../utils/use-locale'
import useStore from '../../utils/use-store'

function Langs() {
  const [langs] = useState(getSupportedLangs())
  const store = useStore()

  const callbacks = {
    changeLang: useCallback((lang) => store.get('lang').changeLang(lang), [])
  }

  return (
    <Languages langs={langs} onClick={callbacks.changeLang}/>
  )
}

export default React.memo(Langs)