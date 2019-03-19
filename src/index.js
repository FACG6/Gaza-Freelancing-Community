const app = require('./app').default;

app.listen(app.get('port'), () => {
  console.log(`the server running on port ${app.get('port')}`);
});
