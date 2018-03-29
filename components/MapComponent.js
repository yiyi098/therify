import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { MapView, Location, Permissions} from 'expo';

class MapComponent extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: { coords: { latitude: 37.78825, longitude: -122.4324 } },
  };
  
  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
  };

  render() {
    return (
      <MapView
        provider={'google'}
        style={{ alignSelf: 'stretch', height: 200 }}
        showsUserLocation={true}
        region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
      />
    );
  }
}

export default MapComponent;