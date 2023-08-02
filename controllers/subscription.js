const db = require('../models')

// create main Model
const Course = db.course
const User = db.user
const Subscription = db.subscription


const subscribeToCourse = async (req, res) => {
    try {
      const { userId, courseId } = req.body;
  
      // Check if the user and course exist in the database
      const user = await User.findByPk(userId);
      const course = await Course.findByPk(courseId);
  
      if (!user || !course) {
        return res.status(404).json({ error: 'User or Course not found.' });
      }
  
      // Create the subscription in the database
      const subscription = await Subscription.create({ userId, courseId });
  
      return res.status(201).json(subscription);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create subscription.' });
    }
  };

  const listCourseSubscriptions = async (req, res) => {
    try {
      const courseId = req.params.courseId;
  
      // Fetch all subscriptions for the course from the database
      const subscriptions = await Subscription.findAll({
        where: { courseId },
        include: User, // Include User model to get user details
      });
  
      return res.status(200).json(subscriptions);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve subscriptions.' });
    }
  };

  module.exports = {
    subscribeToCourse,
    listCourseSubscriptions,
  };