// import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Player from '@vimeo-player/react-native';

export default function App() {
  const [paused, setPaused] = React.useState<boolean>(false);
  const ref = React.useRef(null);

  async function seek(value: number) {
    if (!ref.current) return;
    const totalTime = await ref.current?.getDuration?.();
    console.log("Totaltime", totalTime)
    const getCurrentTime = await ref.current?.getCurrentTime?.();
    console.log(getCurrentTime)
    await ref.current?.seekTo?.(
      Math.min(Math.max(getCurrentTime + value, 0), totalTime)
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Player video="59777392" paused={paused} height={'50%'} width={'100%'} ref={ref} />
      <View>
        <Text>
         {paused? 'paused': 'play'}
        </Text>
      </View>
      <View>
        <Button onPress={() => setPaused(el => !el)} title="Paused" />
      </View>
        <View style={{flex: 1, flexDirection:"column"}}>
          {/* <Button onPress={() => seek(-10)} title="-10s ⏪" />
          <Button onPress={() => seek(-5)} title="-5s ◀️" />
          <Button onPress={() => seek(5)} title="+5s ▶️" /> */}
          <Button onPress={() => seek(10)} title="+10s ⏩" />
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
