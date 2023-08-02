const db = require('../models')


// create main Model
const Course = db.course

const createCourse = async (req, res) => {
    try {
        console.log(req.body)
      const { title, start_date, status } = req.body;
     if(!title||!start_date||!status){
        return res.status(400).json({error: 'Please provide all data.' })
     }
      // Create the course
      const course = await Course.create({
        title,
        start_date,
        status,
      });
  
      return res.status(201).json(course);
    } catch (error) {
        console.log(error.message)
      return res.status(500).json({ error: 'Failed to create course.' });
    }
  };

  const listAllCourses = async (req, res) => {
    try {
      // Fetch all courses from the database
      const courses = await Course.findAll();
  
      return res.status(200).json(courses);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve courses.' });
    }
  };

  const deleteCourse = async (req, res) => {
    try {
      const courseId = req.params.id;
       if(!courseId){
        return res.status(400).json({error: 'Invalid Course Id.' })
       }
      // Find the course by its ID and delete it
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found.' });
      }
  
      await course.destroy();
  
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete course.' });
    }
  };


  const getCourseDetails = async (req, res) => {
    try {
      const courseId = req.params.id;
      if(!courseId){
        return res.status(400).json({error: 'Invalid Course Id.' })
       }
      // Find the course by its ID
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found.' });
      }
  
      return res.status(200).json(course);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch course details.' });
    }
  };


module.exports = {
    createCourse,
    listAllCourses,
    deleteCourse,
    getCourseDetails
    
}