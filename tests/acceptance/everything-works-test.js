import { test } from 'qunit';
import moduleForAcceptance from 'pizza-party/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | everything works');

test('can create and delete teams and engineers', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.js-team').length, 1);
    assert.equal(find('.js-engineer').length, 0);

    assert.equal(find('.js-create-engineer-button:disabled').length, 1);
    assert.equal(find('.js-create-team-button:disabled').length, 1);
    assert.equal(find('.js-create-team-input')[0].value, '');
    assert.equal(find('.js-create-engineer-input')[0].value, '');

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
        assert.equal(find('.js-create-team-input')[0].value, '');
        assert.equal(find('.js-create-engineer-input')[0].value, '');
        assert.equal(find('.js-team').length, 3);
        assert.equal(find('.js-engineer').length, 2);
        click(find('.js-delete-team'));
        click(find('.js-delete-engineer'));

        andThen(function() {
          assert.equal(find('.js-team').length, 1);
          assert.equal(find('.js-engineer').length, 0);
        });
      });
    });
  });
});

test('cannot create blank engineers or teams', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.js-create-engineer-button:disabled').length, 1);
    assert.equal(find('.js-create-team-button:disabled').length, 1);

    andThen(function() {
      fillIn(find('.js-create-team-input'), 'Bulls');
      fillIn(find('.js-create-engineer-input'), 'Zevon');

      andThen(function() {
        assert.equal(find('.js-create-engineer-button:disabled').length, 0);
        assert.equal(find('.js-create-team-button:disabled').length, 0);
      });
    });
  });
});

test('teams are ordered and can be reordered', function(assert) {
  server.createList('team', 3);
  var team1 = server.db.teams[0];
  var team2 = server.db.teams[1];
  var team3 = server.db.teams[2];

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.js-team').length, 4);

    assert.equal($('.team-name').eq(0).text().indexOf(team1.name) > -1, true);
    assert.equal($('.team-name').eq(1).text().indexOf(team2.name) > -1, true);
    assert.equal($('.team-name').eq(2).text().indexOf(team3.name) > -1, true);

    click(find('.js-move-team-forward').eq(0));
    click(find('.js-move-team-back').eq(2));

    andThen(function() {
      assert.equal($('.team-name').eq(0).text().indexOf(team2.name) > -1, true);
      assert.equal($('.team-name').eq(1).text().indexOf(team3.name) > -1, true);
      assert.equal($('.team-name').eq(2).text().indexOf(team1.name) > -1, true);
    });
  });
});

test('can move engineers between teams', function(assert) {
  server.createList('engineer', 2);
  server.createList('team', 2);
  var engineer1 = server.db.engineers[0];
  var engineer2 = server.db.engineers[1];

  var FakeDataTransfer = function(data) {
    return {
      data: data,
      getData: function() {
        return this.data;
      },
      setData: function(data) {
        this.data = data;
      }
    };
  };

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('.js-team').length, 3);
    assert.equal(find('.js-engineer').length, 2);

    var team1 = $('.js-team')[0];
    var team2 = $('.js-team')[1];
    var freeAgents = $('.js-team').eq(2).text().trim();

    assert.equal(freeAgents.indexOf(engineer1.name) > -1, true);
    assert.equal(freeAgents.indexOf(engineer2.name) > -1, true);

    var dataTransfer1 = new FakeDataTransfer(engineer1.id);
    var dataTransfer2 = new FakeDataTransfer(engineer2.id);

    // Move engineer1 to team1
    triggerEvent(team1, 'drop', {dataTransfer: dataTransfer1});

    // Move engineer2 to team2
    triggerEvent(team2, 'drop', {dataTransfer: dataTransfer2});

    andThen(function() {
      var engineersOnFirstTeam = $(team1).text().trim();
      var engineersOnSecondTeam = $(team2).text().trim();
      freeAgents = $('.js-team').eq(2).text().trim();

      // Engineer1 is on team1
      assert.equal(engineersOnFirstTeam.indexOf(engineer1.name) > -1, true);

      // Engineer2 is on team2
      assert.equal(engineersOnSecondTeam.indexOf(engineer2.name) > -1, true);

      var dataTransfer3 = new FakeDataTransfer(engineer1.id);
      triggerEvent(team2, 'drop', {dataTransfer: dataTransfer3});

      // Neither engineer is unassigned to a team
      assert.equal(freeAgents.indexOf(engineer1.name) > -1, false);
      assert.equal(freeAgents.indexOf(engineer2.name) > -1, false);

      andThen(function() {
        var engineersOnFirstTeam = $(team1).text().trim();

        // Engineer1 is not on team1
        assert.equal(engineersOnFirstTeam.indexOf(engineer1.name) > -1, false);

        var engineersOnSecondTeam = $(team2).text().trim();
        // Engineer1 is on team2
        assert.equal(engineersOnSecondTeam.indexOf(engineer1.name) > -1, true);
      });
    });
  });
});
