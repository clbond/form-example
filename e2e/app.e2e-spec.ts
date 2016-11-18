import { FormExamplePage } from './app.po';

describe('form-example App', function() {
  let page: FormExamplePage;

  beforeEach(() => {
    page = new FormExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
