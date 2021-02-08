import React from 'react';

//create a Context object
const UserContext = React.createContext();

//Provider component that allows consuming components to reflect context changes
export const UserProvider = UserContext.Provider

export default UserContext;

