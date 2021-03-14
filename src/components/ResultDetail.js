import React from 'react';
import {View, Image, Text, StyleSheet } from 'react-native';

const ResultDetail = ({ result }) => {
    return(
        <View style={styles.viewStyle}>
            <Image 
                source={{ uri: result.image_url }}
                style={styles.imageStyle} 
            />
            <Text style={styles.nameStyle}>{result.name}</Text>
            <Text>{result.rating} Stars, {result.review_count} Reviews</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        marginLeft: 15
    },
    imageStyle: {
        height: 120,
        width: 250,
        borderRadius: 4,
        marginBottom: 5
    },
    nameStyle: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default ResultDetail;