import { test } from 'qunit';
import moduleForAcceptance from 'pizza-party/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | everything works');

test('test the website like an animal', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.js-team').length, 0);

    andThen(function() {
      fillIn(find('.js-create-team-input'), 'Bulls');
      click(find('.js-create-team-button'));

      fillIn(find('.js-create-team-input'), 'Bears');
      click(find('.js-create-team-button'));

      andThen(function() {
        assert.equal(find('.js-team').length, 2);
        click(find('.js-delete-team'));

        andThen(function() {
          assert.equal(find('.js-team').length, 0);
        });
      });
    });
  });
});
