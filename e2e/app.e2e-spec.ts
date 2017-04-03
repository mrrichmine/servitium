import { Servitium.AuthPage } from './app.po';

describe('servitium.auth App', () => {
  let page: Servitium.AuthPage;

  beforeEach(() => {
    page = new Servitium.AuthPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
