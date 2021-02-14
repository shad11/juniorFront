import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { mapSelectors } from "../../store/map";
import mapStyles from "./mapStyles";
import { LIBRARIES } from "../../constants/map";

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const options = {
    styles: mapStyles, // https://snazzymaps.com/
    disableDefaultUI: true, // disable default UI,
    zoomControl: true,
}

const Map = ({ bounds, latLng, callback }) => {
    const locLatLng = useSelector(mapSelectors.getLocLatLng);
    const center = latLng ? latLng : locLatLng;

    const [marker, setMarker] = useState(undefined);
    const [selected, setSelected] = useState(null);
    const mapBounds = useRef(bounds);
    const mapRef = useRef(null);

    useEffect(() => {
        setMarker(center);
    }, [center]);

    const panTo = useCallback(latLng => {
        mapRef.current.panTo(latLng);
        mapRef.current.setZoom(14);
    }, []);

    const moveTo = useCallback(latLng => {
        if (mapBounds.current && !mapBounds.current.contains(latLng)) {
            return;
        }

        callback(latLng);
        panTo(latLng);
        setMarker(latLng);
    }, []);

    // const getCurrentLocation = useCallback(() => {
    //     navigator.geolocation.getCurrentPosition(
    //         position => {
    //             const lat = position.coords.latitude;
    //             const lng = position.coords.longitude;
    //
    //             moveTo({ lat, lng });
    //         }, () => null);
    // }, []);

    const onMapClick = useCallback((event) => {
        panTo({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        });

        // if (event.placeId) {
        //     setSelected(null);
        // }
        // setSelected(null);
    }, []);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    return (<GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={marker}
        options={options}
        onLoad={onMapLoad}
        //onClick={onMapClick}
    >
        {marker && <Marker
            position={marker}
            draggable={true}
            onDragEnd={(event) => {
                moveTo({ lat: event.latLng.lat() , lng: event.latLng.lng() })
            }}
        />}
    </GoogleMap>);
};

Map.propTypes = {
    bounds: PropTypes.object,
    latLng: PropTypes.object,
    callback: PropTypes.func
};

Map.defaultTypes = {
    callback: () => {}
}

export default memo(Map);