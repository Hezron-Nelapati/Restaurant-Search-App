import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer 6G4A_E58qOfv9KNs-7ZswWqMDoWtoYYrmtr_EJD_lCNC7Lz_ww5KZBAI4GaWRGLQd17o0KJ0JTpkW8LOiWRcYSTCs0KALWNTXaKFwB0zxvwRPOzKwfdGkQYACThOYHYx'
    }
});