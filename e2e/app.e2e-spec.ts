import { Angular4SearchDevsPage } from './app.po';

describe('angular4-search-devs App', () => {
  let page: Angular4SearchDevsPage;

  beforeEach(() => {
    page = new Angular4SearchDevsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
