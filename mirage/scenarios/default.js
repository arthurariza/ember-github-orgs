export default function (server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  const organization = server.create('organization');
  server.createList('repository', 30, { organization });
}
