# API Testing Guide

Quick reference for testing all student CRUD endpoints.

## 🔐 Authentication

First, you need to authenticate and get an access token:

```bash
curl -X POST "http://localhost:5007/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@school-admin.com",
    "password": "3OU4zn3q6Zh9"
  }'
```

Save the token from the response cookies. For the examples below, replace `YOUR_ACCESS_TOKEN` with the actual token.

## 📝 Test Scenarios

### 1. List All Students

**Basic Request**:
```bash
curl -X GET "http://localhost:5007/api/v1/students" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Cookie: accessToken=YOUR_ACCESS_TOKEN"
```

**With Filters**:
```bash
# Filter by class
curl -X GET "http://localhost:5007/api/v1/students?className=Grade%2010" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Filter by section
curl -X GET "http://localhost:5007/api/v1/students?section=A" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Filter by roll number
curl -X GET "http://localhost:5007/api/v1/students?roll=101" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Multiple filters
curl -X GET "http://localhost:5007/api/v1/students?className=Grade%2010&section=A" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Student Name",
      "email": "student@example.com",
      "lastLogin": "2024-01-15T10:30:00Z",
      "systemAccess": true
    }
  ],
  "message": "Students retrieved successfully"
}
```

### 2. Create New Student

**Minimal Data**:
```bash
curl -X POST "http://localhost:5007/api/v1/students" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "Test Student",
    "email": "test.student@example.com"
  }'
```

**Complete Data**:
```bash
curl -X POST "http://localhost:5007/api/v1/students" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "class_name": "Grade 10",
    "section_name": "A",
    "roll": 101,
    "dob": "2005-01-15",
    "gender": "Male",
    "phone": "+1234567890",
    "father_name": "Robert Doe",
    "father_phone": "+1234567890",
    "mother_name": "Jane Doe",
    "mother_phone": "+1234567891",
    "guardian_name": "Uncle Bob",
    "guardian_phone": "+1234567892",
    "relation_of_guardian": "Uncle",
    "current_address": "123 Main Street, City",
    "permanent_address": "123 Main Street, City",
    "admission_dt": "2020-04-01"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Student added and verification email sent successfully."
}
```

Or:
```json
{
  "success": true,
  "message": "Student added, but failed to send verification email."
}
```

### 3. Get Student Detail

Replace `{STUDENT_ID}` with an actual student ID from step 1 or 2:

```bash
curl -X GET "http://localhost:5007/api/v1/students/1" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "systemAccess": true,
    "phone": "+1234567890",
    "gender": "Male",
    "dob": "2005-01-15",
    "class": "Grade 10",
    "section": "A",
    "roll": 101,
    "fatherName": "Robert Doe",
    "fatherPhone": "+1234567890",
    "motherName": "Jane Doe",
    "motherPhone": "+1234567891",
    "guardianName": "Uncle Bob",
    "guardianPhone": "+1234567892",
    "relationOfGuardian": "Uncle",
    "currentAddress": "123 Main Street, City",
    "permanentAddress": "123 Main Street, City",
    "admissionDate": "2020-04-01",
    "reporterName": "Admin User"
  },
  "message": "Student detail retrieved successfully"
}
```

### 4. Update Student

**Partial Update** (only name and phone):
```bash
curl -X PUT "http://localhost:5007/api/v1/students/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "John Smith",
    "phone": "+1234567899"
  }'
```

**Full Update**:
```bash
curl -X PUT "http://localhost:5007/api/v1/students/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "John Smith Updated",
    "email": "john.smith@example.com",
    "class_name": "Grade 11",
    "section_name": "B",
    "roll": 102,
    "phone": "+1234567899",
    "current_address": "456 Oak Avenue, City"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Student updated successfully"
}
```

### 5. Update Student Status

**Activate Student**:
```bash
curl -X POST "http://localhost:5007/api/v1/students/1/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "status": true
  }'
```

**Deactivate Student**:
```bash
curl -X POST "http://localhost:5007/api/v1/students/1/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "status": false
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Student status changed successfully"
}
```

## 🧪 Testing Checklist

### Happy Path Tests
- [ ] List all students (no filters)
- [ ] List students with class filter
- [ ] List students with section filter
- [ ] List students with roll filter
- [ ] List students with multiple filters
- [ ] Create student with minimal data
- [ ] Create student with complete data
- [ ] Get existing student detail
- [ ] Update student with partial data
- [ ] Update student with full data
- [ ] Activate student account
- [ ] Deactivate student account

### Error Handling Tests
- [ ] Get non-existent student (should return 404)
- [ ] Create student with duplicate email (should fail)
- [ ] Update non-existent student (should return 404)
- [ ] Access endpoints without authentication (should return 401)
- [ ] Create student with invalid data format

## 📊 Postman Collection

You can import these into Postman for easier testing:

### Environment Variables
Create a Postman environment with:
- `base_url`: `http://localhost:5007`
- `access_token`: (will be set after login)

### Collection Structure
```
School Management API
├── Auth
│   └── Login
├── Students
│   ├── List All Students
│   ├── List Students with Filter
│   ├── Create Student (Minimal)
│   ├── Create Student (Complete)
│   ├── Get Student Detail
│   ├── Update Student (Partial)
│   ├── Update Student (Full)
│   ├── Activate Student
│   └── Deactivate Student
```

## 🔍 Response Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET, PUT, or status update |
| 201 | Created | Successful POST (student created) |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid auth token |
| 404 | Not Found | Student doesn't exist |
| 500 | Server Error | Database or server error |

## 💡 Tips

1. **Save the access token** from login response - you'll need it for all subsequent requests
2. **Use Postman** for easier testing with collections and environments
3. **Check database** directly to verify data changes:
   ```sql
   SELECT * FROM users WHERE role_id = 3;  -- Students
   SELECT * FROM user_profiles WHERE user_id = 1;
   ```
4. **Monitor backend logs** for detailed error messages
5. **Test edge cases** like empty strings, very long names, special characters

## 🐛 Common Issues

### Issue: 401 Unauthorized
**Solution**: Make sure you're logged in and including the access token in headers

### Issue: 404 Student not found
**Solution**: Verify the student ID exists in the database

### Issue: 500 Internal Server Error
**Solution**: Check backend logs and database connection

### Issue: Email not sending
**Solution**: This is expected if RESEND_API_KEY is not configured. Student is still created.

---

**Quick Test Script**:
Save this as `test-students.sh`:
```bash
#!/bin/bash

BASE_URL="http://localhost:5007/api/v1"
TOKEN="YOUR_ACCESS_TOKEN"

echo "1. List all students..."
curl -X GET "$BASE_URL/students" -H "Authorization: Bearer $TOKEN"

echo "\n\n2. Create student..."
curl -X POST "$BASE_URL/students" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Test Student","email":"test@example.com"}'

echo "\n\n3. Get student detail..."
curl -X GET "$BASE_URL/students/1" -H "Authorization: Bearer $TOKEN"

echo "\n\n4. Update student..."
curl -X PUT "$BASE_URL/students/1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Updated Name"}'

echo "\n\n5. Update status..."
curl -X POST "$BASE_URL/students/1/status" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"status":true}'
```

Make it executable: `chmod +x test-students.sh`  
Run it: `./test-students.sh`
