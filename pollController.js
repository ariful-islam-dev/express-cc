const Poll = require("./Poll");

exports.createPollGetController = (req, res, next) => {
  res.render("create");
};

exports.createPollPostController = async(req, res) => {
  let { title, description, options } = req.body;

  options = options.map((opt) => {
    return {
      name: opt,
      vote: 0,
    };
  });

  let poll = new Poll({
    title,
    description,
    options,
  });

  try{
    await poll.save();
    res.redirect('/polls')

  }catch(error){
      console.log(error);
  }
//   res.render("create");
};


exports.getAllPolls = async(req, res, next)=>{
    try{
        let polls = await Poll.find();

        res.render('polls', {polls})
    }catch(error){
        console.log(error.message);
    }
}
