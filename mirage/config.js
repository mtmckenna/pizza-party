export default function() {
  this.get('/teams');
  this.post('/teams');
  this.patch('/teams/:id');
  this.delete('/teams/:id');

  this.get('/engineers');
  this.post('/engineers');
  this.patch('/engineers/:id');
  this.delete('/engineers/:id');

  this.get('/time-slices');
  this.post('/time-slices');
  this.patch('/time-slices/:id');
  this.delete('/timeSlices/:id');
}

