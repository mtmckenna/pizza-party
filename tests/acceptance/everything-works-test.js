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
