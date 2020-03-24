import axios from 'axios'
const instance =axios.create ({
    baseURL: 'https://react-my-burger-2c1e7.firebaseio.com/'
});
export default instance; 