import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SearchBar from '../components/searchBar';
import useResults from '../hooks/useResults';
import ResultList from '../components/ResultList';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {

    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('United States');
    const [searchApi, results, errorMessage] = useResults();

    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price;
        })
    }
    
    if(!results.length) {
        return null;
    }

    return (
        <View style={styles.backgroundStyle}>
            <ScrollView>
            <SearchBar 
                term={term} 
                onTermChange={setTerm}                         
                onTermSubmit={() => searchApi(term,location)}    
            />
            <View style={styles.locationContainer}>
                <Ionicons 
                    name="ios-location-outline"
                    style={styles.locationIconStyle}
                />
                <TextInput 
                    style={styles.inputStyle}
                    placeholder= 'Location'
                    autoCorrect={true}
                    autoCapitalize="none"
                    value={location}
                    onChangeText={setLocation}
                    onEndEditing={() => searchApi(term, location)}
                />
            </View>
            
            <ResultList 
                results={filterResultsByPrice('$')} 
                title='Cost Effective' 
            />
            <ResultList 
                results={filterResultsByPrice('$$')} 
                title='Bit Pricier' 
            />
            <ResultList 
                results={filterResultsByPrice('$$$')} 
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
    locationContainer: {
        backgroundColor: '#F0EEEE',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: 220,
        alignSelf: 'flex-end',
        marginVertical: 10,
        marginRight: 15,
        borderRadius: 5
    },
    inputStyle: {
        height: 30,
        borderRadius: 5,
        width: 180,
        alignSelf: 'center',
        fontSize: 16
    },
    locationIconStyle: {
        fontSize: 17,
        alignSelf: 'center',
        paddingLeft: 10
    }
});

export default SearchScreen;