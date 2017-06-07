import { HeylooPage } from './app.po';

describe('heyloo App', () => {
  let page: HeylooPage;

  beforeEach(() => {
    page = new HeylooPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
