const { addPost, addRequirment } = require('../database/queries/addData');

exports.createPost = (req, res) => {
  const userid = req.auth.id;
  const proposal = { ...req.body };
  const prpoInfo = proposal.post;
  addPost(prpoInfo.postTitle, prpoInfo.postDescription, userid, prpoInfo.specId)
    .then(({ rows: result }) => {
      const { id } = result[0];
      const { allRequierments } = proposal;
      return allRequierments.forEach(requirment => addRequirment(requirment, id));
    })
    .then(() => {
      res.status(201).send({ success: 'Success Add Post ' });
      res.redirect('/');
    })
    .catch(() => res.status(400).send({ Error: 'Error' }));
};
