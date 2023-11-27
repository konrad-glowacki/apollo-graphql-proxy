import gql from 'graphql-tag';
import { join } from 'node:path';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { print, printSchema } from 'graphql';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { wrapSchema, schemaFromExecutor } from '@graphql-tools/wrap';

const { WPGRAPHQL_URL } = process.env;

export const createRemoteSchema = async () => {
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

  const schema = await schemaFromExecutor(executor);

  const subgraphSchema = buildSubgraphSchema({
    typeDefs: gql(printSchema(schema)),
  });

  return wrapSchema({
    schema: subgraphSchema,
    executor,
  });
};
