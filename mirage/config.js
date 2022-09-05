export default function () {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'https://api.github.com'; // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  this.get('/orgs/fakeorg', { message: 'Nothing found' }, 404);
  this.get('/orgs/:login', (schema, request) => {
    const { login } = request.params;

    const model = schema.organizations.findBy({ login });

    return model?.attrs;
  });

  this.get('/orgs/:login/repos', (schema, request) => {
    const { login } = request.params;

    const org = schema.organizations.findBy({ login });

    return org.repositories.models;
  });

  this.get(
    '/repos/:login/fakerepo/branches',
    { message: 'Nothing found' },
    404
  );

  this.get('/repos/:login/:repository/branches', (schema, request) => {
    const { login } = request.params;

    const org = schema.organizations.findBy({ login });

    return org.repositories.models[0].branches.models;
  });
}
