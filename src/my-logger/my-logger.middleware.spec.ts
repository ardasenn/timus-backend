import { MyLoggerMiddleware } from './my-logger.middleware';

describe('MyLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new MyLoggerMiddleware()).toBeDefined();
  });
});
