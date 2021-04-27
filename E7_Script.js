



// To validate objects
const Joi = require('joi');             // return class
const fs=require('fs');
const path = require('path');
const express = require('express');     // return a function
const app = express();                  // return an object
var bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 


/*       Course entites       */
const courses = [
    { id: 1, name: 'course1' , code: 'cse111' , description:'Maths1' },
    { id: 2, name: 'course2' , code: 'cse222' , description:'Maths2' },
    { id: 3, name: 'course3' , code: 'cse333' , description:'Maths3' }
];


/*        Student entites      */
const students = [
    { id:1, name:'doaa', code:'1111111' },
    { id:2, name:'yehia', code:'2222222' },
    { id:3, name:'sayed', code:'3333333' }
];





// To respond to http get request
app.get('/'/* path or url '/' represrnts route of the website*/, /* callback function */(req, res) => {
    // This req object has a bunch of useful propereties u can refrence documentation for more info
    res.send('Hello World');
});


app.get('/web/courses/create', (req, res) => {

   res.sendFile(path.join(__dirname+'/course_form.html'));
});
 

app.get('/web/students/create', (req, res) => {

   res.sendFile(path.join(__dirname+'/student_form.html'));
});

// to get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// to get all students
app.get('/api/students', (req, res) => {
    res.send(students);
});
 /******************************************************************/



// to get single course

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('The course with the given id was not found.');
        return;
    }
    res.send(course);
});


// to get single student

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('The student with the given id was not found.');
        return;
    }
    res.send(student);
});



/*******************************************************************************/



// Add course
app.post('/api/courses', (req, res) => {
   
    // If not valid, return 400 - bad request
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

   

    // create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name ,// assuming that request body there's a name property
        code:req.body.code,
        description:req.body.description
    };

    courses.push(course);
    res.send(course);
});

app.post('/web/courses/create', (req, res) => {

    res.sendFile(path.join(__dirname+'/course_form.html'));
    // If not valid, return 400 - bad request
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name ,// assuming that request body there's a name property
        code:req.body.code,
        description:req.body.description
    };

    courses.push(course);
    res.send(course);
});




   app.post('/web/students/create', (req, res) => {

    res.sendFile(path.join(__dirname+'/student_form.html'));
    // If not valid, return 400 - bad request
    const { error } = validateStudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }



    // create a new student object
    const student = {
        id: courses.length + 1,
        name: req.body.name ,// assuming that request body there's a name property
        code:req.body.code
       
    };

    students.push(student);
    res.send(student);
});






// Add student
app.post('/api/students', (req, res) => {
      // validate request
// validate 
    // If not valid, return 400 - bad request
    const { error } = validateStudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }



    // create a new student object
    const student = {
        id: courses.length + 1,
        name: req.body.name ,// assuming that request body there's a name property
        code:req.body.code
       
    };

    students.push(student);
    res.send(student);
});










/******************************************************************************/

// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('The course with the given id was not found.');
        return;
    }

    // If not valid, return 400 - bad request
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the course 
    // Return the updated course
    course.name = req.body.name;
    course.code=req.body.code;
    course.description=req.body.description;

    res.send(course);
});



// Updating resources
app.put('/api/students/:id', (req, res) => {
    // Look up the student
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('The student with the given id was not found.');
        return;
    }

    // validate 
    // If not valid, return 400 - bad request
    const { error } = validateStudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }


    
    // Update the course 
    // Return the updated course
    student.name = req.body.name;
    student.code=req.body.code;
    

    res.send(student);
});



/****************************************************************/


// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('The course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});



// Deleting a student
app.delete('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('The student with the given id was not found.');
        return;
    }

    // Delete
    const index = students.indexOf(student);
    students.splice(index, 1);

    // Return the same course
    res.send(student);
});










// Environment variable
const port = process.env.PORT || 3000

app.listen(port /*PortNumber*/, () => console.log(`Listening on port ${port}......`) /* optionally a function that called when the app starts listening to the given port */);




function validateCourse(course) {
     //schema : the shape of the object
    const schema = {
        name: Joi.string().min(5).required(),

        code: Joi.string().regex(/^[A-Za-z]{3}[0-9]{3}$/).required(),

        description:Joi.string().max(200).optional()
    };
   
        return Joi.validate(course, schema);
}



function validateStudent(student){

 //schema : the shape of the object
    const schema = {
        name: Joi.string().regex(/^[a-zA-Z\'-]+$/).required(),

        code: Joi.string().regex(/^.{7}$/).required()

    };

    return Joi.validate(student, schema);

}