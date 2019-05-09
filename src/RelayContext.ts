import React from 'react';
import { Environment } from 'relay-runtime';

const RelayContext = React.createContext<Environment>(null as any);

export default RelayContext;
