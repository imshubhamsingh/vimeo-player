// import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Player from '@vimeo-player/react-native';

export default function App() {
  const [paused, setPaused] = React.useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Player video="59777392" paused={paused} height={'50%'} width={'100%'} autopause={false} autoplay={true}/>
      <View style={{height: 100}}>
        <Text>
         {paused? 'paused': 'play'}
        </Text>
      </View>
      <View>
        <Button onPress={() => setPaused(el => !el)} title="Paused" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
