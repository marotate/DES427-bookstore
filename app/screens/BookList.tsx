// BooksList.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: string;
  picture: string;
}

interface BooksListProps {
  books: Book[];
  category: string;
  onGoBack: () => void;
}

const BooksList: React.FC<BooksListProps> = ({ books, category, onGoBack }) => {
  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.picture }} style={styles.bookImage} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookCategory}>{item.category}</Text>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookPrice}>{item.price} ฿</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category}</Text>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.bookListColumn}
        contentContainerStyle={styles.fullBookList}
      />
      <Text onPress={onGoBack} style={styles.goBack}>
        Go Back
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0B0F4C",
  },
  bookItem: {
    width: width * 0.5,
    margin: 5,
    backgroundColor: "#d0d4fa",
    borderRadius: 10,
    overflow: "hidden",
  },
  bookImage: {
    width: "100%",
    height: height * 0.24,
    resizeMode: "contain",
  },
  bookDetails: {
    padding: 10,
    backgroundColor: "#0B0F4C",
  },
  bookCategory: {
    fontSize: 10,
    color: "#fff",
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  bookAuthor: {
    fontSize: 11,
    color: "#fff",
  },
  bookPrice: {
    fontSize: 20,
    color: "#fff",
  },
  goBack: {
    marginTop: 20,
    color: "#0B0F4C",
    fontWeight: "bold",
    textAlign: "center",
  },
  bookList: {
    paddingVertical: 10,
  },
  fullBookList: {
    paddingHorizontal: 10,
  },
  bookListColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

export default BooksList;
