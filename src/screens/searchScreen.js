import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import SearchBar from '../components/searchBar';
import useResults from '../hooks/useResults';

const SearchScreen = () => {

    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');
    const [searchApi, results, errorMessage] = useResults();
    
    return (
        <View style={styles.backgroundStyle}>
            <SearchBar 
                term={term} 
                onTermChange={setTerm}                         
                onTermSubmit={() => searchApi(term,location)}    
            />
            <TextInput 
                style={styles.inputStyle}
                placeholder= '  Location'
                autoCorrect={true}
                autoCapitalize="none"
                value={location}
                onChangeText={setLocation}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <Text>We have found {results.length} results</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: 'rgb(255,255,255)',
        ...StyleSheet.absoluteFillObject
    },
    inputStyle: {
        marginTop: 10,
        backgroundColor: '#F0EEEE',
        height: 30,
        borderRadius: 5,
        width: 180,
        alignSelf: 'flex-end',
        marginHorizontal: 15,
        fontSize: 16
    }
});

export default SearchScreen;