import { print } from 'graphql';
import { wrapSchema, schemaFromExecutor } from '@graphql-tools/wrap';

const { WPGRAPHQL_URL } = process.env;

const executor = async ({ document, variables }) => {
  if (!WPGRAPHQL_URL) {
    throw new Error('Please define WPGRAPHQL_URL');
  }

  const fetchResult = await fetch(WPGRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: print(document), variables }),
  });

  return fetchResult.json();
};

export const getSchema = async () => {
  return wrapSchema({
    schema: await schemaFromExecutor(executor),
    executor,
  });
};
