module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getSingle: (req, res) => {
    res.render("single.ejs");
  },
};
