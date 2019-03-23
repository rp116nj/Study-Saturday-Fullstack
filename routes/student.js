const router = require('express').Router();
const Student = require('../db/models/students');
const Test = require('../db/models/tests');

router.get('/:studentId', function(req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => {
      if (!student) return res.sendStatus(404);
      res.json(student);
    })
    .catch(next);
});

router.get('/', function (req, res, next) {
 
    Student.findAll({ include: { all: true } }).then(students =>
      res.json(students)
    );
  
});

router.post('/', async (req, res, next) => {
  try {
    const newStudent = await Student.create(req.body)
    const newTest = await Test.create(
      {
        subject: 'default',
        grade: 78,
        studentId: newStudent.id
      }
    )
    //res.json({ newStudent, newTest })
    const newStudentWIthTest = await Student.findByPk(newStudent.id, {
      include: [{
        model: Test,
      }]
   })
    res.json(newStudentWIthTest)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', function(req, res, next) {
  Student.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(test => res.status(201).json(test[1][0]))
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
