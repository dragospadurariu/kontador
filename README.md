
## Brief Summary ##

I've created a React app that
-fetches 200 posts from GraphQL API available at https://fakerql.stephix.uk/ and store it into DATA variable
- initialize an array of objects ( MONTHS ) that has months and counter at as properties
- transform the createdAt property of each post from DATA into a datetime
- filter the DATA based on year 2019
- for each post in DATA, if DATA.month is equal with MONTHS.month, then increment MONTHS.counter


-i've created a component <Chart/> that gets MONTHS as parameter


## Challenges
 - i wanted to call setSet after useQuery in order to keep the data provided by Graphql into the state, but I failed to do that