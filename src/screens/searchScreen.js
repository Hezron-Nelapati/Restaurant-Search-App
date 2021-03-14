import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SearchBar from '../components/searchBar';
import useResults from '../hooks/useResults';
import ResultList from '../components/ResultList';

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
            <TextInput 
                style={styles.inputStyle}
                placeholder= 'Location'
                autoCorrect={true}
                autoCapitalize="none"
                value={location}
                onChangeText={setLocation}
                onEndEditing={() => searchApi(term, location)}
            />
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
    inputStyle: {
        marginTop: 10,
        backgroundColor: '#F0EEEE',
        height: 30,
        borderRadius: 5,
        width: 180,
        alignSelf: 'flex-end',
        marginHorizontal: 15,
        fontSize: 16,
        marginBottom: 3,
        paddingLeft: 5
    }
});

export default SearchScreen;