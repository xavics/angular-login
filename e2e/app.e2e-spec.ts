import { AngularLoginPage } from './app.po';

describe('angular-login App', () => {
  let page: AngularLoginPage;

  beforeEach(() => {
    page = new AngularLoginPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
