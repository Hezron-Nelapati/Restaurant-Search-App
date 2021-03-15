import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import yelp from '../api/yelp';

const ReviewDetail = ({ id }) => {
    const [ reviews, setReview ] = useState([]); 

    

    const getReview = async (id) => {
        try{
            console.log({id}) 
            const response = await yelp.get(`/${id}/reviews`);
            console.log(response);
            console.log(response.data.reviews);
            setReview(response.data.reviews);
        }catch(err) {}
    }

    useEffect(()=>{
        getReview(id);
    },[]);

    console.log(reviews);

    return (
        <View>
            <Text style={styles.reviewHStyle}>Reviews</Text>
            <FlatList 
                data={reviews}
                keyExtractor={(review)=>{review.id}}
                renderItem={({ item })=>{
                    return (
                        <View style={styles.reviewCStyle}>
                            <View style={styles.reviewBHStyle}>
                            <Text style={styles.reviewNStyle}>{item.user.name}</Text>
                            <Text style={styles.reviewTStyle}>{item.time_created}</Text>
                            </View>
                            <View style={styles.reviewBStyle}>
                                <Text style={styles.reviewBCStyle}>{item.text}</Text>
                                <Text style={styles.reviewBRStyle}>Rating: {item.rating}stars</Text>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    reviewHStyle: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 10
    },
    reviewCStyle: {
        marginLeft: 10,
        marginBottom: 7
    },
    reviewBHStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    reviewNStyle: {
        fontSize: 16
    },
    reviewTStyle: {
        paddingRight: 10,
        fontSize: 13
    },
    reviewBStyle: {
        fontSize: 15,
        marginTop: 5
    },
    reviewBCStyle: {},
    reviewBRStyle: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: 3
    }
});

export default ReviewDetail;