import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import ResultList from '../components/ResultList';
import yelp from '../api/yelp';
import { Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

    // const [term, setTerm] = useState('');
    // const [location, setLocation] = useState('Dallas');
    //const [searchApi, results, errorMessage] = useResults();

     const filterResultsByPrice = (priceOne, priceTwo) => {
         return results.filter(result => {
             return result.price === priceOne || result.price === priceTwo;
         })
     }

    const [results, setResults] = useState([]);

    const getResult = async () => {
        try{
            const response = await yelp.get('/search', {
                params: {
                    limit: 50,
                    term: '',
                    location: 'United States'
                }
            })
            setResults(response.data.businesses);
        }catch (err) {

        }
    }

    useEffect(()=>{
        getResult();
    },[])
    
    if(!results.length) {
        return null;
    }

    return (
        <View style={styles.backgroundStyle}>
            <ScrollView>
                <TouchableOpacity style={styles.searchContainer} onPress={() => {navigation.navigate('Search')}}>
                    <Feather name='search' style={styles.iconStyle} /> 
                </TouchableOpacity>
                <ResultList 
                    results={filterResultsByPrice('$','$')} 
                    title='Cost Effective' 
                />
                <ResultList 
                    results={filterResultsByPrice('$$','$$')} 
                    title='Bit Pricier' 
                />
                <ResultList 
                    results={filterResultsByPrice('$$$','$$$$')} 
                    title='Big Spender' 
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: 'rgb(255,255,255)',
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    searchContainer: {
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
        alignItems: 'flex-end'
    },
    iconStyle: {
        fontSize: 25,
        paddingRight: 5
    }
});

export default HomeScreen;