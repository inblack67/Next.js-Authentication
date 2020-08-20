export default (req, res) => {
  switch (req.method) {
    case 'GET':
      return res.send('API up and running');
  }
}