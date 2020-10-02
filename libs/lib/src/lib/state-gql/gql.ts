import {gql} from "@apollo/client";
// movieListTerm @client @export(as: "term")

export const QUERY_MOVIE_LIST = gql`
query ($term: String!) {
  search(term: $term) {
    edges {
      node {
        ... on MovieResult {
          id
          title
          rating
          details {
            genres {
              id
              name
            }
          }
        }
      }
    }
  }
}
`;

// selectedMovieId @client @export(as: "id")

export const QUERY_SELECTED_MOVIE = gql`
query ($id: Int!) {
  movies {
    movie(id: $id) {
      wikipediaExtract @client
      wikipediaPageId @client
      id
      title
      rating
      externalIds {
        imdb
      }
      details {
        genres {
          id
          name
        }
      }
      similar {
        edges {
          node {
            id
            title
            rating
            externalIds {
              imdb
            }
            details {
              genres {
                id
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

