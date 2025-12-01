const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll } = req.query;
    
    const payload = {
        name,
        className,
        section,
        roll: roll ? parseInt(roll) : undefined
    };
    
    const students = await getAllStudents(payload);
    
    res.status(200).json({
        success: true,
        data: students,
        message: "Students retrieved successfully"
    });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    
    const result = await addNewStudent(payload);
    
    res.status(201).json({
        success: true,
        message: result.message
    });
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const payload = {
        ...req.body,
        id: parseInt(id)
    };
    
    const result = await updateStudent(payload);
    
    res.status(200).json({
        success: true,
        message: result.message
    });
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const student = await getStudentDetail(parseInt(id));
    
    res.status(200).json({
        success: true,
        data: student,
        message: "Student detail retrieved successfully"
    });
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const reviewerId = req.user?.id; // Assuming user info is attached by auth middleware
    
    const payload = {
        userId: parseInt(id),
        reviewerId,
        status
    };
    
    const result = await setStudentStatus(payload);
    
    res.status(200).json({
        success: true,
        message: result.message
    });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
