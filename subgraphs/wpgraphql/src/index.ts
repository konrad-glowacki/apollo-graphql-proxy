import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { createRemoteSchema } from './schema';

async function bootstrap() {
  const server = new ApolloServer({
    schema: await createRemoteSchema(),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT ? parseInt(process.env.PORT) : 4000 },
  });

  console.log(`🚀 WPGraphQL proxy running at ${url}`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
