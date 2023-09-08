import { useState } from 'react';
import { StyleSheet, View, Dimensions, Text, Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const MapComponent = ({ navigation, route }) => {
    const { coordinates, redirectPath } = route.params;
    const [coordinate, setCoordinate] = useState({
        latitude: coordinates?.latitude || 40.730610,
        longitude: coordinates?.longitude || -73.935242
    })
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                initialRegion={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                // onPress={(e) => setCoordinate(e.nativeEvent.coordinate)}
                // onRegionChange={(region) => {
                //     setCoordinate({
                //         latitude: region.latitude,
                //         longitude: region.longitude,
                //     })
                // }}
                onRegionChangeComplete={(region) => {
                    if (region.latitude.toFixed(6) === coordinate.latitude.toFixed(6)
                        && region.longitude.toFixed(6) === coordinate.longitude.toFixed(6)) {
                        return;
                    }
                    setCoordinate({
                        latitude: region.latitude,
                        longitude: region.longitude,
                    })
                }}
            >
                <Marker coordinate={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                }} />
            </MapView>
            <View style={styles.searchContainer}>
                <GooglePlacesAutocomplete
                    style={{ textInput: styles.input }}
                    placeholder='Search'
                    fetchDetails
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        setCoordinate({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        });
                    }}
                    query={{
                        key: 'AIzaSyDtPFbGZM7FWj_esKZVrHngKLXBA6uvIno',
                        language: 'en',
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title='Next' onPress={() => navigation.navigate(redirectPath, {
                    selectedCoordinate: {
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                    }
                })} />
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    searchContainer: {
        position: 'absolute',
        width: '90%',
        backgroundColor: 'white',
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 4,
        borderRadius: 8,
        bottom: 60,
    },
    buttonContainer: {
        position: 'absolute',
        width: '90%',
        backgroundColor: 'white',
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 4,
        borderRadius: 8,
        bottom: 10,
    },
    input: {
        borderColor: "#888",
        borderWidth: 1
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});
export default MapComponent;