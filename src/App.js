import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import './App.css';
import Chart from '../src/components/chart.component';

//Connection the site to the GraphQL API
const client = new ApolloClient({
  uri: 'https://fakerql.stephix.uk/graphql',
  cache: new InMemoryCache(),
});

//Write Query
const POSTS_NUMBER = 200;
const POSTS_QUERY = gql`
  {
    allPosts(count: ${POSTS_NUMBER}) {
      createdAt
      id
    }
  }
`;

function App() {
  function PostsList() {
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
    return <Chart data={months} />;
  }

  return (
    <ApolloProvider client={client}>
      <div className='container'>
        <h1>The number of posts for each month</h1>
        <h2>year - 2019, total posts - {POSTS_NUMBER}</h2>
        <PostsList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
