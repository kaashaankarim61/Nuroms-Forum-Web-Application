import { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [userId, setUserId] = useState('');
  let yourJwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InZ1cFZkb2JvUWhHa0RZemlNNXAtWkEiLCJleHAiOjE2ODM0ODQ1NDUsImlhdCI6MTY4Mjg3OTc0Nn0.WxICuvap1eNhTdh_nBF3EtdS-zoPk66kY_v8fff7GiQ'

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('https://api.zoom.us/v2/users/me', {
          headers: {
            'Authorization': `Bearer ${yourJwtToken}`
          }
        });
        setUserId(response.data.id);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserId();
  }, []);

  return (
    <div>
      <p>Zoom User ID: {userId}</p>
    </div>
  );
};


export default MyComponent;