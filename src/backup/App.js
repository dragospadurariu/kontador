import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import './App.css';

//Connection the site to the GraphQL API
const client = new ApolloClient({
  uri: 'https://fakerql.stephix.uk/graphql',
  cache: new InMemoryCache(),
});

//Write
const POSTS_QUERY = gql`
  {
    allPosts(count: 15) {
      createdAt
      id
    }
  }
`;

const PostsList = () => {
  const { loading, error, data } = useQuery(POSTS_QUERY);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const { allPosts } = data;

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const months = monthNames.map((monthName) => ({
    month: monthName,
    counter: 0,
  }));
  for (const post of allPosts) {
    const dateTime = new Date(new Number(post.createdAt));
    const year = dateTime.getFullYear();

    if (year === 2019) {
      const month = dateTime.getMonth();
      const foundMonth = months.find((m) => m.month == monthNames[month]);
      if (foundMonth) {
        months[months.indexOf(foundMonth)] = {
          ...foundMonth,
          counter: foundMonth.counter + 1,
        };
      }
    }
  }

  return months.map(month=>(
  <h1 key={month.month}>{month.month} - {month.counter}</h1>)
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <PostsList />
    </ApolloProvider>
  );
}

export default App;
