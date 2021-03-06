import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import styled from '@emotion/styled';
import {Poll} from 'ducks';
import {pollListSelector} from 'selectors';
import ListItem from 'components/ListItem';

const List = styled.div({
  width: '100%',
  overflow: 'hidden'
});

export default () => {
  const list = useSelector(pollListSelector);

  return (
    <List>
      {list.map((poll: Poll) => (
        <Fragment key={poll.id}>
          <ListItem poll={poll}/>
        </Fragment>
      ))}
    </List>
  );
};