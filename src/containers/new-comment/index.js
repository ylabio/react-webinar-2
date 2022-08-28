import React, {useState} from 'react';

import LayoutFlex from '../../components/layout-flex';
import Input from '../../components/input';
import Field from '../../components/field';

function NewComment() {
  const [data, setData] = useState({
    comment: ''
  });
  return (
    <LayoutFlex indent={'small'}>
      <form onSubmit={() => {}}>
        <h5>Новый комментарий</h5>
        <Field label={''} error={''} spacing={'small'}>
          <Input
            theme={'wide'}
            name="comment"
            type="text"
            onChange={() => {}}
            value={''}
          />
        </Field>
        <Field spacing={'small'}>
          <button disabled={true} type="submit">
            Отправить
          </button>
        </Field>
      </form>
    </LayoutFlex>
  );
}

export default React.memo(NewComment);

// TODO: заменить input на textarea {resize: none}
