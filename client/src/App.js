import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dailyhabitdash from './pages/Dailyhabitdashboard';
import Newhabit from './pages/Newhabit';
import Progress from './pages/Progress';
import Calender from './pages/Calender';
import Profile from './pages/Profile';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
            
          <div className="container">
            <Routes>
              <Route 
                path="/"
                element={<Home />}
              />
              <Route 
                path="/login" 
                element={<Login />}
              />
              <Route 
                path="/signup"
                element={<Signup />}
              />
              <Route 
              // TODO: adjust based on data feedback from user
                path="/questions" 
                element={<Questions />}
              />
              <Route 
                path="/Dailyhabitdashboard/:username" 
                element={<Dailyhabitdashboard />}
              />
              <Route 
                path="/newhabit" 
                element={<Newhabit />}
              />
              <Route 
                path="/progress" 
                element={<Progress />}
              />
              <Route 
                path="/calendar" 
                element={<Calender />}
              />
              <Route 
                path="profiles/:username" 
                element={< Profile/>}
              />
            </Routes>
          </div>
          <Footer/>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;