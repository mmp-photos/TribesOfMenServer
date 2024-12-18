// classesRouter.js
import express from 'express';
import ClassService from '../services/classService.js';

const classesRouter = express.Router();
const classService = new ClassService();

classesRouter.get('/', async(req, res) => {
  console.log(`It's time to start the music!`);
  try {
    const db = await connectToDatabase();
    const muppetsCollection = db.collection('users');
    const findUsername = "Matt";
    const firstMuppet = await muppetsCollection.findOne({ username: findUsername });
    res.status(200).json(firstMuppet);
    console.log(`The Classes route has been called`)
    console.log("Fetched Muppet:", firstMuppet); // Log the returned result
  } catch (error) {
    console.error("Error fetching Muppet:", error);
    res.status(500).json({ error: 'Failed to retrieve the first Muppet' });
  } finally {
    await client.close();
  }
});

// // GET /classes
// classesRouter.get('/', async (req, res) => {
//   console.log(`All classes requested`)
//   try {
//     const classData = await classService.getAllClasses();
//     if (classData.length === 0) {
//       return res.status(404).json({ message: 'No classes found' });
//     }
//     res.json(classData);
//   } catch (error) {
//     console.error('Error retrieving class data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // GET /classes/:classID
// classesRouter.get('/id/:classID', async (req, res) => {
//   console.log(`Requested class by ID`);
//   const classId = req.params.classID;
//   console.log(`The class ID requested from the app is ${classId}`);
//   try {
//     const classData = await classService.getClassById(classId);
//     if (classData.length === 0) {
//       return res.status(404).json({ message: 'Class not found' });
//     }
//     res.json(classData);
//   } catch (error) {
//     console.error('Error retrieving class data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// classesRouter.get('/all_data', async (req, res) => {
//   console.log(`Requested all class data`)
//   const classId = req.params.classID;
//   try {
//     const classData = await classService.getAllClassData(classId);
//     if (classData.length === 0) {
//       return res.status(403).json({ message: 'No featured classes found' });
//     }
//     res.json(classData);
//   } catch (error) {
//     console.error('Error retrieving class data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// classesRouter.get('/location', async (req, res) => {
//   console.log(`Requested classes by location`)
//   const classId = req.params.classID;
//   try {
//     const classData = await classService.getAllClassesByLocation(classId);
//     if (classData.length === 0) {
//       return res.status(403).json({ message: 'No featured classes found' });
//     }
//     res.json(classData);
//   } catch (error) {
//     console.error('Error retrieving class data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// classesRouter.get('/age', async (req, res) => {
//   console.log(`Requested classes by location`)
//   const classId = req.params.classID;
//   try {
//     const classData = await classService.getAllClassesByAge(classId);
//     if (classData.length === 0) {
//       return res.status(403).json({ message: 'No featured classes found' });
//     }
//     res.json(classData);
//   } catch (error) {
//     console.error('Error retrieving class data:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// classesRouter.post('/add', async (req, res) => {
//   console.log(`Adding Class to Database`);
//   const newClassData = req.body;
//   console.log(newClassData);
//   try {
//     const classData = await classService.addNewClass(newClassData);
//     // Assuming classData is returned upon successful insertion, you can return a success response
//     return res.status(201).json({ message: 'Class added successfully', classData });
//   } catch (error) {
//     console.error('Error adding class:', error);
//     // Return an appropriate error status code based on the error type
//     if (error instanceof SomeSpecificError) {
//       return res.status(400).json({ message: 'Bad request' });
//     } else {
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// });

export default classesRouter;
