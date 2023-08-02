// import controllers review, products
const {createCourse,listAllCourses,deleteCourse,getCourseDetails} = require('../controllers/course.js')
const {createUser,loginUser} = require('../controllers/user.js')
const {listCourseSubscriptions,subscribeToCourse} = require('../controllers/subscription.js')
const { verifyToken } = require('../middleware/auth.js')

// router
const router = require('express').Router()

// user routes

router.post('/signup',createUser)
router.post('/login', loginUser)




// course routes
router.post('/courses', createCourse);

router.get('/courses', listAllCourses);

router.delete('/courses/:id', deleteCourse);

router.get('/courses/:id', getCourseDetails);




// subscription routes
router.post('/subscriptions',verifyToken, subscribeToCourse);
router.get('/courses/:courseId/subscriptions', listCourseSubscriptions);

module.exports = router