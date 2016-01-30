export default function() {
  this.get('/teams', function(db) {
    return {
      data: db.teams.map(attrs => (
        {type: 'teams', id: attrs.id, attributes: attrs }
      ))
    };
  });

  this.post('/teams', function(db, request) {
    var attrs = JSON.parse(request.requestBody).data.attributes;
    var team = db.teams.insert(attrs);

    return {
      data: {
        type: 'teams',
        id: team.id,
        attributes: attrs
      }
    };
  });

  this.delete('/teams/:id', {data: null});

  this.get('/engineers', function(db) {
    return {
      data: db.engineers.map(attrs => (
        {type: 'engineers', id: attrs.id, attributes: attrs }
      ))
    };
  });

  this.post('/engineers', function(db, request) {
    var attrs = JSON.parse(request.requestBody).data.attributes;
    var engineer = db.engineers.insert(attrs);

    return {
      data: {
        type: 'engineers',
        id: engineer.id,
        attributes: attrs
      }
    };
  });

  this.patch('/engineers/:id', function(db, request) {
    var data = JSON.parse(request.requestBody).data;
    var engineer = db.engineers.update(data.id, data);

    return {
      data: {
        type: 'engineers',
        id: engineer.id,
        attributes: data.attributes
      }
    };
  });

  this.delete('/engineers/:id', {data: null});
}

