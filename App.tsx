import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Polygon } from 'react-native-maps';
import data from './data.json';
console.log(data);

const polygoneWidth = 0.1;
const polygoneWidthHalf = polygoneWidth / 2;

const calcPolygonCoords = item => {
  const topLeft = {
    latitude: item.latitude - polygoneWidthHalf,
    longitude: item.longtitude + polygoneWidthHalf,
  };
  const topRight = {
    latitude: item.latitude + polygoneWidthHalf,
    longitude: item.longtitude + polygoneWidthHalf,
  };
  const bottomLeft = {
    latitude: item.latitude - polygoneWidthHalf,
    longitude: item.longtitude - polygoneWidthHalf,
  };
  const bottomRight = {
    latitude: item.latitude + polygoneWidthHalf,
    longitude: item.longtitude - polygoneWidthHalf,
  };

  return [topLeft, topRight, bottomRight, bottomLeft];
};

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 32.0853,
          longitude: 34.7818,
          latitudeDelta: 2,
          longitudeDelta: 2,
        }}>
        {data.map(item => (
          <Polygon
            key={`${item.latitude}_${item.longtitude}`}
            coordinates={calcPolygonCoords(item)}
            fillColor={`rgba(0,0,0,${item['cloud-cover']})`}
            strokeColor={`rgba(0,0,0,${item['cloud-cover']})`}
          />
        ))}
      </MapView>
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
