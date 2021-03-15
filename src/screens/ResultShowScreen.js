import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';
import ReviewDetail from '../components/ReviewDetail';

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

    //console.log({result})

    if(!result) {
        return null;
    }

    return (
        <View style={styles.containerStyle}>
            <ScrollView>
                <Image 
                    source={{ uri: result.image_url }}
                    style={styles.imageOneStyle} 
                />
                <View style={styles.titleStyle}>
                    <Text style={styles.nameStyle}>{result.name}</Text>
                    <Text>{result.rating} Stars, {result.review_count} Reviews</Text>
                    
                </View>
                <View style={styles.aboutStyle}>
                    <Text style={styles.aboutHeadStyle}>About</Text>
                    <Text style={styles.aboutBodyStyle}>{result.name} is also known as {result.alias.replace(/-/g,' ')}.</Text>
                    <Text style={styles.aboutBodyStyle}>phone: {result.display_phone}</Text>
                    <Text style={styles.aboutBodyStyle}>location: {result.location.address1}, {result.location.city}, {result.location.state}, {result.location.zip_code} </Text> 
                </View>
                <View>
                <Text style={styles.phHeadStyle}>Photos</Text>
                <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={result.photos}
                    keyExtractor= {(photo) => photo}
                    renderItem={ ({ item }) => {
                        return <Image style={styles.photosStyle} source={{ uri: item }}
                        />
                    }}
                />
                <ReviewDetail id={id} />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)'
    },
    imageOneStyle: {
        height: 200,
        width: 350,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 3
    },
    titleStyle: {
        marginLeft: 10
    },
    nameStyle: {
        fontSize: 20,
        fontWeight: '500'
    },
    aliasStyle: {
        fontSize: 16,
        marginLeft: 15
    },
    phHeadStyle: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10,
        marginBottom: 3
    },
    photosStyle: {
        height: 200,
        width: 300,
        marginLeft: 10,
        borderRadius: 4,
        marginRight: 3
    },
    aboutStyle : {
        marginLeft: 10,
        marginVertical: 10
    },
    aboutHeadStyle: {
        fontSize: 18,
        fontWeight: '700'
    },
    aboutBodyStyle: {
        fontSize: 16,
        paddingLeft: 7
    }
});

export default ResultShowScreen;