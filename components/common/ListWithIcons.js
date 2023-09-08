import React from 'react';
import {List} from 'react-native-paper';

const ListWithIcons = ({title, leftIcon, rightIcon}) => {
  return (
    <List.Item
      style={{padding: 0, margin: 0}}
      title={title}
      left={props => (
        <List.Icon
          {...props}
          icon={leftIcon}
          color="#F9B406"
          style={{margin: 0, padding: 0}}
        />
      )}
      right={props => <List.Icon {...props} icon={rightIcon} color="#F9B406" />}
    />
  );
};

export default ListWithIcons;
