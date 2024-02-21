import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  
  const user = useSelector((state) => state.user.user);
  console.log('User:', user);
  // Checks if the user is undefined before accessing its properties
  if (!user) {
    return <div>Loading...</div>; 
  }

  // Render user data
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
