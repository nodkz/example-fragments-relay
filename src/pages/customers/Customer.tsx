import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Customer_data } from './__generated__/Customer_data.graphql';

interface Props {
  data: Customer_data;
}

function Customer({ data }: Props) {
  return (
    <div>
      <div>{data.companyName}</div>
      {data.orderList && (
        <div>
          {data.orderList.map((order) => (
            <span>{!!order && order.orderID}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default createFragmentContainer(Customer, {
  data: graphql`
    fragment Customer_data on Customer {
      companyName
      orderList {
        orderID
      }
    }
  `,
});
