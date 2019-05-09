import React from 'react';
import { QueryRenderer } from 'react-relay';
import { RouteComponentProps } from 'react-router-dom';
import { OrdersQuery as Q } from './__generated__/OrdersQuery.graphql';
import RelayContext from '../../RelayContext';
import graphql from 'babel-plugin-relay/macro';

interface Props extends RouteComponentProps {}

class TypedQueryRenderer extends QueryRenderer<Q> {}

export default function Orders(p: Props) {
  return (
    <RelayContext.Consumer>
      {(relayEnv) => (
        <TypedQueryRenderer
          environment={relayEnv}
          variables={{}}
          query={graphql`
            query OrdersQuery {
              viewer {
                category {
                  description
                  name
                }
                orderPagination(perPage: 3, page: 1, sort: ORDERID_ASC) {
                  count
                  items {
                    orderID
                    customerID
                    customer {
                      ...Customer_data @relay(mask: false)
                    }
                  }
                }
                regionList {
                  name
                }
              }
            }
          `}
          render={({ error, props }) => {
            if (error) return <div>{error.message}</div>;
            if (props)
              return (
                <div>
                  <pre>{JSON.stringify(props, null, 2)}</pre>
                </div>
              );
            return <div>Loading...</div>;
          }}
        />
      )}
    </RelayContext.Consumer>
  );
}
