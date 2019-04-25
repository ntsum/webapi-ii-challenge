require('dotenv').config();
//reads .env and merges it into process.env

const router = require('./api/router.js');

const port = process.env.PORT || 4000;
router.listen(port, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
