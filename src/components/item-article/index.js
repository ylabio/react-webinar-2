import React from 'react';
import Controls from "../controls";

const ItemActicle = ({article, onAdd }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column',width: '94%', margin: '0 auto', marginTop: '20px', gap: '20px' }}>
            <div>
                {article.description}
            </div>
            <div>Страна производитель:  <strong>{article.maidIn?.title}</strong></div>
            <div>Категория: <strong>{article.category?.title}</strong></div>
            <div>Год выпуска: <strong>{article?.edition}</strong> </div>
            <div> <strong>Цена:  {article.price} ₽</strong></div>
            <Controls onAdd={onAdd}/>
        </div>
    );
};

export default React.memo(ItemActicle);