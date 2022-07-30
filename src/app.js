import React from 'react'
import { counter } from './utils.js'
import ListItem from './components/ListItem.jsx'
import './style.css'
import App__head from './components/App__head.jsx'

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
	// Выбор состояния из store
	const { items } = store.getState()

	return (
		<div className='App'>
			<App__head text={'Приложение на чистом JS'} />
			<div className='Controls'>
				<button
					onClick={() => {
						const code = counter()
						store.createItem({
							code,
							title: `Новая запись ${code}`,
						})
					}}>
					{' '}
					Добавить{' '}
				</button>
			</div>
			<div className='App__center'>
				<div className='List'>
					{items.map(item => (
						<ListItem item={item} store={store} />
					))}
				</div>
			</div>
		</div>
	)
}

export default App
