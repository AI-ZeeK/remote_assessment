import { DefaultRoute } from '../routes/default.route'; // Adjust the path if necessary
import request from 'supertest';
import { App } from '../app';

describe('Default Route', () => {
  let app: App;

  beforeAll(() => {
    const defaultRoute = new DefaultRoute();
    app = new App([defaultRoute]); // Initialize the app with the DefaultRoute
  });

  it('should fetch the root route "/" and return the expected string', async () => {
    const res = await request(app.getServer()).get('/');
    expect(res.statusCode).toEqual(200); // Ensure the status code is 200
    expect(typeof res.body).toBe('string'); // Ensure the response is a string
    expect(res.body).toBe('HELLO!!!..., YOU FOUND ME'); // Ensure the response matches the expected string
  });
});
