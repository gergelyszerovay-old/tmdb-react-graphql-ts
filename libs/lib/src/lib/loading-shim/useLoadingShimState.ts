import {useReactiveVar} from "@apollo/client";
import {fetchStateVar} from "../state-gql/cache";

export interface LoadingShimState {
  loading: boolean;
}

const useLoadingShimState = (): LoadingShimState => {
  const fetchState = useReactiveVar(fetchStateVar);

  return {
    loading: Object.values(fetchState).reduce((acc, v: any) => (acc || v.loading), false)
  };
};

export default useLoadingShimState;
