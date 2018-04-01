import React from 'react';
import { Button,Image, TextInput, StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { FileSystem, } from 'expo';
import { Feather, FontAwesome as Icon } from "@expo/vector-icons";

const pictureSize = 150;

export default class GalleryScreen extends React.Component {
  state = {
    photos: [],
    showUploadPage:false,
    currentPhotoUri: null,
    currentPhotoTitle: null,
    currentPhotoAbout: null,
  };
  _mounted = false;

  componentDidMount() {
    this._mounted = true;
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos').then(photos => {
      if (this._mounted) { this.setState( { photos, }, ); }
    });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  renderGalleryScreen(){
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={this.props.onPress}>
          <Text>Back</Text>
        </TouchableOpacity>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
            {this.state.photos.map(photoUri => (
              <View style={styles.pictureWrapper} key={photoUri}>
                <Image
                  key={photoUri}
                  style={styles.picture}
                  source={{ uri: `${FileSystem.documentDirectory}photos/${photoUri}`, }}
                />
                <Button 
                  style={styles.uploadButton} 
                  title="Post Photo"
                  onPress={()=>{ this.showUploadScreen(photoUri); }}
                > </Button>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  renderUploadScreen(){
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={this.showGalleryScreen.bind(this)}>
          <Text>Go To Gallery</Text>
        </TouchableOpacity>
        <ScrollView contentComponentStyle={{ flex: 1 }}>
          <View style={styles.pictures}>
            <View style={styles.pictureWrapper} key={this.state.currentPhotoUri}>
              <Image
                key={this.state.currentPhotoUri}
                style={styles.picture}
                source={{
                  uri: this.state.currentPhotoUri
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-around', alignItems: 'center' }}>
            <TextInput
              ref="search"
              placeholder="Title"
              style={{ height: 30, fontSize: 15, textAlign: 'center', flex: 5, backgroundColor: '#eeeeee', marginRight: 10 }}
              onChangeText={(text) => { this.handleTextInputChange(text) }}
            />
            <TextInput
              ref="summary"
              placeholder="summar"
              style={{ height: 30, fontSize: 15, textAlign: 'center', flex: 5, backgroundColor: '#eeeeee', marginRight: 10 }}
              onChangeText={(text) => { this.handleTextInputChange(text) }}
            />
            <Icon name="search"
              onPress={this.handleSubmit}
              style={{ flex: 1, fontSize: 20, backgroundColor: '#e8195b', color: 'white', paddingLeft: 30, paddingTop: 5, paddingBottom: 5 }}
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  handleSubmit = () => {

  }
  handleTextInputChange = (text) => {

  }

  showGalleryScreen(){
    console.log("Show upload page is: "+ JSON.stringify(this.state));
    this.setState({showUploadPage:false });
  };

  showUploadScreen(photoUri) {
    this.setState({
      showUploadPage: true,
      currentPhotoUri: `${FileSystem.documentDirectory}photos/${photoUri}`,
    });
  };

  render() {
    const content = this.state.showUploadPage
      ? this.renderUploadScreen() : this.renderGalleryScreen();
    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  picture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    resizeMode: 'contain',
  },
  pictureWrapper: {
    width: pictureSize,
    height: pictureSize,
    margin: 5,
  },
  backButton: {
    padding: 20,
    marginBottom: 4,
    backgroundColor: 'indianred',
  },
  uploadButton: {
    padding: 10,
    marginBottom: 4,
    backgroundColor: 'blue',
  }
});
