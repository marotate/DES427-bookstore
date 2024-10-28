import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, onValue } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_STORAGE } from '../../Firebaseconfig'; 
import { getDownloadURL, ref as storageRef } from 'firebase/storage';

const { width, height } = Dimensions.get('window');

// Define the Book interface
interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  ISBN: string;
  stock: number;
  price: string;
  description: string;
  picture: string;
}

const Home = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [books, setBooks] = useState<Book[]>([]);
    const searchBarAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const booksRef = ref(FIREBASE_DB, 'books');
        onValue(booksRef, async (snapshot) => {
            const data = snapshot.val();
            const booksArray = await Promise.all(Object.keys(data).map(async key => {
                const book = data [key];
                const pictureRef = storageRef(FIREBASE_STORAGE, book.picture);
                const pictureUrl = await getDownloadURL(pictureRef);
                return { id: key, ...book, picture: pictureUrl};
            }));
            

            setBooks(booksArray);
        });
    }, []);

    const toggleSearchBar = () => {
        setIsSearchVisible(!isSearchVisible);
        Animated.timing(searchBarAnimation, {
            toValue: isSearchVisible ? 0 : 1,
            duration: 100,
            useNativeDriver: false,
        }).start();
    };

    const searchBarWidth = searchBarAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, width * 0.9],
    });

    const renderItem = ({ item }: { item: Book }) => (
        <View style={styles.bookItem}>
            <Image source={{ uri: item.picture }} style={styles.bookImage} onError={(error) => console.log('Image Load Error:', error.nativeEvent.error)} />
            <View style={styles.bookDetails}>
                <Text style={styles.bookAuthor}>{item.category}</Text>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>{item.author}</Text>
                <Text style={styles.bookPrice}>${item.price}</Text>
            </View>
        </View>
    );

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
                            onBlur={toggleSearchBar}
                        />
                        <TouchableOpacity onPress={toggleSearchBar} style={styles.closeIcon}>
                            <Ionicons name="close" size={24} color="#0B0F4C" />
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
            <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.bookList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        backgroundColor: '#f2f2f2',
        padding: width * 0.05,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.03,
    },
    title: {
        fontSize: width < 360 ? 16 : 18,
        fontWeight: 'bold',
        color: '#0B0F4C',
        textAlign: 'left',
        paddingRight: width * 0.06,
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
    bookList: {
        paddingTop: 20,
    },
    bookItem: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    bookImage: {
        width: 60,
        height: 90,
        borderRadius: 5,
    },
    bookDetails: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0B0F4C',
    },
    bookAuthor: {
        fontSize: 14,
        color: '#666',
    },
    bookPrice: {
        fontSize: 14,
        color: '#0B0F4C',
    },
});

export default Home;
