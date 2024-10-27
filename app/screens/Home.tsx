import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Home = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchBarAnimation = useRef(new Animated.Value(0)).current;

    const toggleSearchBar = () => {
        setIsSearchVisible(!isSearchVisible);
        Animated.timing(searchBarAnimation, {
            toValue: isSearchVisible ? 0 : 1, // Slide out or in
            duration: 100,
            useNativeDriver: false,
        }).start();
    };

    // Interpolating width for search bar based on animation value
    const searchBarWidth = searchBarAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * 0.9], // Full width of search bar
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {!isSearchVisible ? (
                    <>
                        <Text style={styles.title}>WELCOME TO BOOKSHELF STORE</Text>
                        <TouchableOpacity onPress={toggleSearchBar}>
                            <Ionicons name="search" size={30} color="#0B0F4C" style={styles.icon} />
                        </TouchableOpacity>
                    </>
                ) : (
                    <Animated.View style={[styles.searchBar, { width: searchBarWidth }]}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search title/publisher/author/ISBN"
                            placeholderTextColor="#999"
                            onBlur={toggleSearchBar} // Optionally close the search bar when it loses focus
                        />
                        <TouchableOpacity onPress={toggleSearchBar} style={styles.closeIcon}>
                            <Ionicons name="close" size={24} color="#0B0F4C" />
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        backgroundColor: '#f2f2f2',
        padding: width * 0.05, // 5% of the width
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.03, // 2% of the height
    },
    title: {
        fontSize: width < 360 ? 16 : 18, // Adjust font size based on screen width
        fontWeight: 'bold',
        color: '#0B0F4C',
        textAlign: 'left',
        paddingRight: width * 0.06, // Space between text and icon (5% of width)
    },
    icon: {
        marginLeft: 5,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#0B0F4C',
    },
    closeIcon: {
        paddingLeft: 10,
    },
});

export default Home;
