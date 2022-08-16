const router = require("express").Router();
const Student = require("../Models/user");
const Time =require("../Models/time")


router.route("/student/save").post(async (req, res) => {
  const { name, contact, email, teacherName, password, type } = req.body;
  const details = new Student({
    username: name,
    contact: contact,
    email: email,
    teacherName: teacherName,
    password: password,
    type: type
  });
  await details
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.route("/time/save").post(async (req, res) => {
  const { teacher,description,time,date,link } = req.body;
  const details = new Time({
    teacher: teacher,
    Description:description,
    link:"#",
    time: time,
    date: date,

  });
  await details
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});


router.route("/login/:username/:password").get((req, res) => {
  let name = req.params.username;
  let pass = req.params.password;
  Student.findOne({
    $and: [{ username: { $eq: name } }, { password: { $eq: pass } }],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.route("/students").get((req, res) => {
  Student.find({
    type: { $eq: "student" },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.route("/times").get((req, res) => {
  Time.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});


router.route("/student/remove/:id").delete((req, res) => {
  let id = req.params.id;
  Student.deleteOne({
    _id: { $eq: id },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.route("/time/remove/:id").delete((req, res) => {
  let id = req.params.id;
  Time.deleteOne({
    _id: { $eq: id },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.route("/meeting/:t_name").get((req, res) => {
  let name = req.params.t_name;
  Time.find({
    teacher: { $eq: name },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.route("/signin/:username/:password").get((req, res) => {
  let email = req.params.username;
    let pass = req.params.password;
  Student.findOne({
    $and: [{ email: { $eq: email } }, { password: { $eq: pass } }],
  })
    .then((data) => {
      if (data) {
        res.json(data);
      }
      else {
        res.json(null);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});
 
router.route("/meeting/update/:id").put((req, res) => {
  let id = req.params.id;
  const { link } = req.body;

  Time.findOneAndUpdate({ _id: id }, { link: link })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});
// router.route("/user/count").get((req, res) => {
//   User.find()
//     .then((data) => {
//       res.json(data.length);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

module.exports = router;
