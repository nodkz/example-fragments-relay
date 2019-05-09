import { Environment, Network, RecordSource, Store, RequestNode, Variables } from 'relay-runtime';
import graphql from 'babel-plugin-relay/macro';

function fetchQuery(operation: RequestNode, variables: Variables) {
  const uri = 'https://graphql-compose.herokuapp.com/northwind/';
  // const uri = 'http://localhost:4444/northwind/';
  return fetch(uri, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
}

export const relayEnv = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

const query = graphql`
  query relayEnvQuery($page: Int!, $perPage: Int!) {
    viewer {
      orderPagination(page: $page, perPage: $perPage) {
        ...relayEnv_orderPagination
      }
    }
  }
`;

const orderPagination = graphql`
  fragment relayEnv_orderPagination on OrderPagination {
    count
    items {
      ...relayEnv_order
    }
    pageInfo {
      pageCount
      currentPage
    }
  }
`;

const order = graphql`
  fragment relayEnv_order on Order {
    orderID
    orderDate
    customerID
    employeeID
    employee {
      firstName
      lastName
      birthDate
    }
    customer {
      companyName
      orderList(limit: $perPage) {
        orderID
      }
    }
    freight
  }
`;

console.log('RelayNode:', query);
console.log('OrderPaginationNode:', orderPagination);
console.log('OrderNode:', order);
console.log('RelayNodeUnwrapped:', query());
const { createOperationDescriptor, getRequest } = (relayEnv as any).unstable_internal;
const request = getRequest(query);
console.log('Request:', request);
const variables = { page: 1, perPage: 5 };
const operation = createOperationDescriptor(request, variables);
console.log('Operation:', operation);
relayEnv
  .execute({ operation })
  .toPromise()
  .then((res: any) => console.log(`Result:`, res));
