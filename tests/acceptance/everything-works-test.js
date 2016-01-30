import { test } from 'qunit';
import moduleForAcceptance from 'pizza-party/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | everything works');

test('can create and delete teams and engineers', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.js-team').length, 0);
    assert.equal(find('.js-engineer').length, 0);

    andThen(function() {
      fillIn(find('.js-create-team-input'), 'Bulls');
      click(find('.js-create-team-button'));

      fillIn(find('.js-create-team-input'), 'Bears');
      click(find('.js-create-team-button'));

      fillIn(find('.js-create-engineer-input'), 'Zevon');
      click(find('.js-create-engineer-button'));

      fillIn(find('.js-create-engineer-input'), 'Spielberg');
      click(find('.js-create-engineer-button'));

      andThen(function() {
        assert.equal(find('.js-team').length, 2);
        assert.equal(find('.js-engineer').length, 2);
        click(find('.js-delete-team'));
        click(find('.js-delete-engineer'));

        andThen(function() {
          assert.equal(find('.js-team').length, 0);
          assert.equal(find('.js-engineer').length, 0);
        });
      });
    });
  });
});
