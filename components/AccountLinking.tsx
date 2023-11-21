import React, { useState } from 'react';
import axios from 'axios';

const AccountLinking = () => {

  const [linked, setLinked] = useState(false);

  const handleLinkMoodleAccount = async () => {
    try {
      // Authenticate the user with the Moodle API
      const response = await axios.post('https://your-moodle-api-endpoint/authenticate', {
        username: 'if190135',
        password: 'Allesklar05',
      });

      // Handle the API response
      console.log(response.data);

      // Set the linked state to indicate successful linking
      setLinked(true);
    } catch (error) {
      console.error('Failed to link Moodle account:', error);
    }
  };

  return (
    <div>
      <h1>Moodle Account Linking</h1>
      {linked ? (
        <p>Moodle account linked successfully!</p>
      ) : (
        <button onClick={handleLinkMoodleAccount}>Link Moodle Account</button>
      )}
    </div>
  );
};

export default AccountLinking;
