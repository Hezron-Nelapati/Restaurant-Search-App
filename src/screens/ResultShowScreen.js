import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const ResultShowScreen = ({ navigation }) => {

    const id = navigation.getParam('id');

    const [result, setResult] = useState(null);

    const getResult = async (id) => {
        try{
            const response = await yelp.get(`/${id}`);
            setResult(response.data);
        }catch(err){}
    };

    useEffect(()=>{
        getResult(id);
    },[]);

    if(!result) {
        return null;
    }

    return (
        <View style={styles.containerStyle}>
            <ScrollView>
                <Text>{result.name}</Text>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={result.photos}
                    keyExtractor= {(photo) => photo}
                    renderItem={ ({ item }) => {
                        return <Image style={styles.imageStyle} source={{ uri: item }}
                        />
                    }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)'
    },
    imageStyle: {
        height: 200,
        width: 300,
        marginRight: 10
    }
});

export default ResultShowScreen;