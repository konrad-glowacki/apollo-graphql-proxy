import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { getSchema } from './schema';

async function main() {
  const server = new ApolloServer({
    schema: await getSchema(),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT ? parseInt(process.env.PORT) : 4000 },
  });

  console.log(`🚀 WPGraphQL proxy running at ${url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
