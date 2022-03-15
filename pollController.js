const Poll = require("./Poll");

exports.createPollGetController = (req, res, next) => {
  res.render("create");
};

exports.createPollPostController = async (req, res) => {
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

  try {
    await poll.save();
    res.redirect("/polls");
  } catch (error) {
    console.log(error);
  }
  //   res.render("create");
};

exports.getAllPolls = async (req, res, next) => {
  try {
    let polls = await Poll.find();

    res.render("polls", { polls });
  } catch (error) {
    console.log(error.message);
  }
};

exports.viewPollGetController = async (req, res, next) => {
  try {
    let id = req.params.id;
    let poll = await Poll.findById(id);
    res.render("viewPoll", { poll });
  } catch (error) {
    console.log(error.message);
  }
};

exports.viewPollPostController = async (req, res, next) => {
  try {
    let id = req.params.id;
    let optionId = req.body.option;

    let poll = await Poll.findById(id);
    let options = [...poll.options];

    let index = options.findIndex((o) => o.id === optionId);
    options[index].vote = options[index].vote + 1;

    let totalVote = poll.totalVote + 1;
    await Poll.findOneAndUpdate(
      { _id: poll._id },
      {
        $set: { options, totalVote },
      }
    );

    res.redirect("/polls/" + id);
  } catch (error) {
    console.log(error.message);
  }
};
