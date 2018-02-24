import { AnuglarSrcPage } from './app.po';

describe('anuglar-src App', function() {
  let page: AnuglarSrcPage;

  beforeEach(() => {
    page = new AnuglarSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
