import React from 'react';
import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import RelayContext from '../../RelayContext';
import OrderList from './OrderList';
import { OrderListQuery as R } from './__generated__/OrderListQuery.graphql';

class TypedQueryRenderer extends QueryRenderer<R> {}

type VARS = R['variables'];

interface Props extends VARS {
  onSetPage: (page: number) => any;
}

export default class OrderListQuery extends React.Component<Props> {
  render() {
    return (
      <RelayContext.Consumer>
        {(relayEnv) => (
          <TypedQueryRenderer
            environment={relayEnv}
            variables={{
              page: this.props.page || 1,
              perPage: this.props.perPage || 20,
            }}
            query={graphql`
              query OrderListQuery($page: Int!, $perPage: Int!) {
                viewer {
                  orderPagination(page: $page, perPage: $perPage) {
                    ...OrderList_orderPagination
                  }
                }
              }
            `}
            render={({ error, props }) => {
              if (error) return <div>{error.message}</div>;
              if (props && props.viewer && props.viewer.orderPagination) {
                return (
                  <OrderList
                    orderPagination={props.viewer.orderPagination}
                    onSetPage={this.props.onSetPage}
                  />
                );
              }
              return <div>Loading...</div>;
            }}
          />
        )}
      </RelayContext.Consumer>
    );
  }
}
