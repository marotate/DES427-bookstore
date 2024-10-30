// OrderSummary.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type OrderSummaryProps = {
    totalPrice: number;
    onGoBack: () => void;
  };

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalPrice, onGoBack }) => {


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#0B0F4C" />
                </TouchableOpacity>
                <Text style={styles.header}>Order Summary</Text>
            </View>
            <Text style={styles.totalPrice}>Total Price: {totalPrice.toFixed(2)} ฿</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        paddingTop: 30,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0B0F4C",
        flex: 1,
        textAlign: 'center',
    },
    backButton: {
        padding: 10,
    },
    totalPrice: {
        fontSize: 20,
        color: '#0B0F4C',
        textAlign: 'center',
    },
});

export default OrderSummary;
