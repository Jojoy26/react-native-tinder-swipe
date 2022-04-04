import React, {useState} from 'react';
import {} from 'react-native';
import {Container} from './app_styles';
import Card from './components/card';

const App = () => {
  const [list, setList] = useState(Array.from(Array(10).keys()));
  const onSwipe = () => {
    const copyList = [...list];
    copyList.pop();
    console.log(list);
    setList(copyList);
  };

  return (
    <Container>
      {list.map((e, index) => {
        return <Card index={index} key={e} onSwipe={onSwipe} />;
      })}
    </Container>
  );
};

export default App;
