const { addPost, addRequirment } = require('../database/queries/addData');

exports.createPost = (req, res) => {
  const prpoInfo = { ...req.body };
  addPost(prpoInfo.title, prpoInfo.decsription, 1, prpoInfo.specaliza_id)
    .then(({ rows: result }) => {
      const { id } = result[0];
      const { requirments } = prpoInfo;
      requirments.forEach((requirment) => {
        addRequirment(requirment, id).then(() => {
          res.status(201).send({ success: result.title });
          res.redirect('/');
        }).catch(() => res.status(400).send({ Error: 'Error' }));
      });
    })
    .catch(() => res.status(400).send({ Error: 'Error' }));
};
