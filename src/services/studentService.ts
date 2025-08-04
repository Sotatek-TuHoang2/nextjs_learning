import type { Student, StudentFormData } from "@/types/Student";
import axiosInstance from "./axiosInstance";

const STUDENT_ENDPOINT = "/students";

export const studentService = {
    // Lấy danh sách sinh viên
    getStudents: async (searchTerm: string = "") => {
        try {
            const params = searchTerm ? { q: searchTerm } : {};
            const response = await axiosInstance.get<Student[]>(STUDENT_ENDPOINT, {
                params,
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách sinh viên:", error);
            throw error;
        }
    },
    // Thêm mới sinh viên
    addStudent: async (studentData: StudentFormData) => {
        try {
            const currentResponse = await axiosInstance.get<Student[]>(
                STUDENT_ENDPOINT
            );
            const students = currentResponse.data;

            let maxId = 0;
            students.forEach((student) => {
                const studentId = parseInt(student.id);
                if (!isNaN(studentId) && studentId > maxId) {
                    maxId = studentId;
                }
            });

            const newId = (maxId + 1).toString();

            const newStudent = { ...studentData, id: newId };
            const newResponse = await axiosInstance.post<Student>(
                STUDENT_ENDPOINT,
                newStudent
            );
            return newResponse.data;
        } catch (error) {
            console.error("Lỗi khi thêm sinh viên: ", error);
            throw error;
        }
    },
    // Update sinh viên
    updateStudent: async (id: string, studentData: StudentFormData) => {
        try {
            const response = await axiosInstance.put<Student>(
                `${STUDENT_ENDPOINT}/${id}`,
                studentData
            );
            return response.data;
        } catch (error) {
            console.error("Lỗi khi sửa sinh viên: ", error);
            throw error;
        }
    },
    // Xóa sinh viên
    deleteStudent: async (id: string) => {
        try {
            const response = await axiosInstance.delete<void>(
                `${STUDENT_ENDPOINT}/${id}`
            );
            return { success: true };
        } catch (error) {
            console.error("Lỗi khi xóa sinh viên: ", error);
            throw error;
        }
    },
};
