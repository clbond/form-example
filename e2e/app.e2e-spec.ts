import { FormsExamplePage } from './app.po';

describe('forms-example App', () => {
  let page: FormsExamplePage;

  beforeEach(() => {
    page = new FormsExamplePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('My form!');
  });
});
