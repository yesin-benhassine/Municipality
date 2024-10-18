
import React from 'react';
import { Alert, Button, Pressable, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

function App(): React.JSX.Element {
  return (
    <View> 
      <Text>Hello Yassine and fuck u to </Text>
      <Text>Hello Yassine and fuck u all </Text>
      <Text>Hello Yassine and fuck u all </Text>
      <Text>Hello Yassine and fuck u all </Text>
      <Text>Hello Yassine and fuck u all </Text>
      <Button  title='Hello pls click me'/>
      <Text>Hello Yassine and fuck u all </Text>
      <Pressable 
      style={{
        backgroundColor: 'red',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={function(){ Alert.alert('Hello') }}
      ><Text> Hello </Text></Pressable>
    </View>
  );
}


export default App;