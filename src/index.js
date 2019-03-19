const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`the server running on port ${app.get('port')}`);
});
