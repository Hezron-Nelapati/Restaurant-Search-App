import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchApi = async (searchTerm, searchLocation) => {
        try{
        const response = await yelp.get('/search', {
            params: {
                term: searchTerm,
                location: searchLocation,
                limit: 50
            }
        });
        setResults(response.data.businesses);
        //console.log(results);
        }catch (err) {
            setErrorMessage('Something Went Wrong');
        }
    }

    useEffect(()=>{
        searchApi('', 'United States')
    },[])

    return [searchApi, results, errorMessage];
};