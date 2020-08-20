export default (req, res) => {
  switch (req.method) {
    case 'GET':
      return res.send('API up and running');

    default:
      return res.status(500).json({ success: false });
  }
}