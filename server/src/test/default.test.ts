import { DefaultRoute } from '../routes/default.route';
import request from 'supertest';
import { App } from '../app';

describe('Default Route', () => {
  let app: App;

  beforeAll(() => {
    const defaultRoute = new DefaultRoute();
    app = new App([defaultRoute]);
  });

  it('should fetch the root route "/" and return the expected string', async () => {
    const res = await request(app.getServer()).get('/');
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body).toBe('string');
    expect(res.body).toBe('HELLO!!!..., YOU FOUND ME');
  });
});
