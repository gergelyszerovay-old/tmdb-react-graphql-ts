# Simple movie listing app that demonstrates how to use Apollo Client 3.2.1 as the store with React and Typescript

The application uses the Apollo Client's cache and reactive variables as store. 
The app fetches data both from a Graphql and an REST endpoint.   

## Quickstart

You can use npm or docker-compose.

### Installation and configuration

`git clone https://github.com/gergelyszerovay/tmdb-react-graphql-ts.git`

If the https://tmdb.apps.quintero.io/ site not works, update the URL (https://tmdb.apps.quintero.io/) to a local instance of https://github.com/nerdsupremacist/tmdb
 in the `proxy.conf.json` file.

To install the required packages, enter:

`docker-compose up install` or `npm install`

### Run the app

`docker-compose up app`

or

`npm run start`

You can open the app here: http://localhost:4200/

### Storybook

You can run Storybook with:

`docker-compose up storybook` or `nx run lib:storybook`

You can open the Storybook here: http://localhost:4400/

### Unit tests

You can run the unit test with:

`docker-compose up test-unit` or `nx affected:test --all`

## I met with the following Apollo Client issues during the development:
* [MockedProvider causing test to complain about not using act() #5920](https://github.com/apollographql/apollo-client/issues/5920) - I use a workaround
* [MockedProvider does not return data when fetchPolicy is set to "cache-and-network" #779](https://github.com/apollographql/react-apollo/issues/779) - I use a workaround
* [Reactive variables: Updating nested properties doesn't trigger a re-render #6699](https://github.com/apollographql/apollo-client/issues/6699) - I use useReactiveVar hook to access the reactive variables
* [useQuery stops updating after first network error #6759](https://github.com/apollographql/apollo-client/issues/6759)
* [useQuery returns incorrect results when returning from the cache #3717](https://github.com/apollographql/react-apollo/issues/3717)
---

This application uses the TMDb API but is not endorsed or certified by TMDb.
