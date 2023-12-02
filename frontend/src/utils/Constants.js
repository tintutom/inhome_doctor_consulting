

export const baseUrl = "http://localhost:8001/";
export const mediaUrl= "http://localhost:8001";



// User
export const userSignup = "signup"
export const userLogin = "login"
export const userLogout = "logout"
export const verifyToken ="verifyToken"
export const userDetail ="myprofile"
export const userprofileUpdate="profileupdate"
export const changepassword ="changepassword"
export const randomdoctors ='randomdoctor'
export const hospitaldetail ='hospital_detail'

export const userhospital ='userhospital'
export const doctordetail ='doctor_detail'
export const tokenlist = 'token'
export const bookingdata = 'booking'
export const opticket = 'optickets'

// Doctors

export const hospitalDashboard = 'doctors'
export const hospitalSignup = "doctors/signup"
export const hospitalLogin = "doctors/login"
export const hospitalLogout = "doctors/logout"
export const hospitalverifyToken ="doctors/verifyToken"
export const hospitalDepartmentAdd = "doctors/department_add"
export const hospitalDepartment = "doctors/department_details"
export const addDoctor = "doctors/doctor_add"

export const doctorlist = "doctors/doctor"
export const doctorAvailable = "doctors/doctor_available"
export const bookinglist = "doctors/booking_details"

export const doctorAdditionalInfo = "doctors/<int:doctor_id>/additional-details"
// Admin

//Admin
export const adminDashboard = 'cadmin/'
export const adminLogin = "cadmin/login"
export const adminLogout = "cadmin/logout"
export const adminUser = "cadmin/user"
export const blockUser = "cadmin/block_user"
export const adminHospital = "cadmin/hospital"
export const approveHospital = "cadmin/hospital_approval"
export const deleteHospital = "cadmin/hospital_delete"
export const addDepartment = "cadmin/department_add"
export const adminDepartment = "cadmin/department"
export const adminDepartments = "cadmin/departments"
export const deleteDepartment = "cadmin/department_delete"
