import React from 'react';
import ListItem from 'components/ListItem';
import styled from '@emotion/styled';
import {useSelector} from 'react-redux';
import {pollListSelector} from 'selectors';

const List = styled.div({
  width: '100%',
  overflow: 'hidden'
});

export default () => {
  const list = useSelector(pollListSelector);
  return (
    <List>
      {list.map((item) => {
        return (
          <div key={item.id}>
            <ListItem {...item}/>
          </div>
        )
      })}
    </List>
  );
};