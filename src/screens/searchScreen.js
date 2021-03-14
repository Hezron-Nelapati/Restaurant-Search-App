import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import yelp from '../api/yelp';
import SearchBar from '../components/searchBar';

const SearchScreen = () => {

    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (searchTerm) => {
        try{
        const response = await yelp.get('/search', {
            params: {
                term: searchTerm,
                location: location,
                limit: 50
            }
        });
        setResults(response.data.businesses);
        console.log(results);
        }catch (err) {
            setErrorMessage('Something Went Wrong');
        }
    }

    return (
        <View style={styles.backgroundStyle}>
            <SearchBar 
                term={term} 
                onTermChange={setTerm                            }
                onTermSubmit={searchApi({term})}    
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