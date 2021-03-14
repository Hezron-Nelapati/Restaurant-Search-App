import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ResultDetail from '../components/ResultDetail';
import { withNavigation } from 'react-navigation';

const ResultList = ({ title, results, navigation }) => {

    if(!results.length) {
        return null;
    }
    
    return(
        <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}>{title}</Text>
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={(result) => {result.id}}
                renderItem={({ item })=>{
                    return (
                            <TouchableOpacity onPress={()=>navigation.navigate('ResultShow', { id: item.id })}>
                                <ResultDetail result={item}/>
                            </TouchableOpacity>
                            
                        );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle:{
        marginBottom: 10
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    }
});

export default withNavigation(ResultList);