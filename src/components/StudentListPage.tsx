'use client'
import { useState, useEffect } from 'react';
import { Typography, Input, Layout, Select, Tooltip, Button, Space, message } from 'antd';
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import StudentDetailModal from '@/components/StudentDetailModal';
import StudentTable from '@/components/StudentTable';
import StudentFormModal from '@/components/StudentFormModal';
import type { Student, StudentFormData } from '@/types/Student';
import { studentService } from '@/services/studentService';

const { Header, Content } = Layout;
const { Search } = Input;
const { Title } = Typography;

const StudentListPage: React.FC = () => {
    // Cấu hình trạng thái
    const [messageApi, contextHolder] = message.useMessage();
    const [students, setStudents] = useState<Student[]>([]);
    const [listFiltered, setListFiltered] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [studentSelected, setStudentSelected] = useState<Student | undefined>(undefined);
    const [classFilter, setClassFilter] = useState("");
    const [selectedDetail, setSelectedDetail] = useState<Student | null>(null);
    const [detailVisible, setDetailVisible] = useState(false);

    const fetchStudents = async (search = '') => {
        try {
            setLoading(true);
            const data = await studentService.getStudents(search);
            setStudents(data);
            setListFiltered(data);
        } catch {
            messageApi.error("Error get student list")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents()
    }, []) // Reload 1 lan de lay du data

    //Follow state of filter class & search
    useEffect(() => {
        let filtered = [...students];

        if (searchTerm) {
            filtered = filtered.filter(student =>
                student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (classFilter) {
            filtered = filtered.filter(student =>
                student.class === classFilter
            );
        }

        setListFiltered(filtered);
    }, [searchTerm, classFilter, students]);

    const uniqueClass = Array.from(new Set(students.map(student => student.class))); // Laasy danh sach lop duy nhat de do vao loc

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleResetFilter = () => {
        setSearchTerm("");
        setClassFilter("");
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleAdd = () => {
        setStudentSelected(undefined);
        setModalVisible(true);
    };

    const handleDetail = (student: Student) => {
        setSelectedDetail(student);
        setDetailVisible(true);
    };

    const handleEdit = (student: Student) => {
        setStudentSelected(student);
        setModalVisible(true);
    }

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);
            await studentService.deleteStudent(id);
            messageApi.success("Delete student successfully!");
            fetchStudents(searchTerm);
        } catch {
            messageApi.error("Error deleting student!")
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data: StudentFormData) => {
        try {
            setConfirmLoading(true);
            if (studentSelected) {
                await studentService.updateStudent(studentSelected.id, data);
                messageApi.success("Update student successfully!");
            } else {
                await studentService.addStudent(data);
                messageApi.success("Add student successfully!")
            }

            setModalVisible(false);
            fetchStudents(searchTerm);
        } catch {
            messageApi.error(studentSelected ?
                "Error update student" :
                "Error add student"
            )
        } finally {
            setConfirmLoading(false);
        }
    };

    const titleModal = studentSelected ? "Update Student Information" : "Add Student";
    const contentSubmit = studentSelected ? "Save" : "Add";

    return (
        <>
            {contextHolder}
            <Layout style={{ minHeight: "100vh" }}>
                <Header style={{ background: "#fff", padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center"}}>
                        <Title level={3}>
                            Student Management
                        </Title>
                    </div>
                </Header>

                <Content style={{ padding: "20px" }}>
                    <div style={{ padding: "20px", background: "#fff", borderRadius: "10px", marginBottom: "20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "30px", flexWrap: "wrap" }}>
                            <Search
                                style={{ width: "30%", minWidth: "250px" }}
                                placeholder='Search by name or email'
                                allowClear
                                onSearch={handleSearch}
                                onChange={handleSearchChange}
                            >
                            </Search>

                            <Select
                                style={{ width: "200px" }}
                                placeholder="Select class"
                                allowClear
                                value={classFilter || undefined}
                                onChange={(value) => setClassFilter(value || "")}
                            >
                                {uniqueClass.map((className) => (
                                    <Select.Option
                                        key={className}
                                        value={className}
                                    >
                                        {className}
                                    </Select.Option>
                                ))}
                            </Select>

                            <Space>
                                <Tooltip title="Refresh">
                                    <Button
                                        icon={<ReloadOutlined />}
                                        onClick={() => fetchStudents(searchTerm)}
                                        loading={loading}
                                    />
                                </Tooltip>
                                <Button onClick={handleResetFilter}>
                                    Reset filter
                                </Button>
                            </Space>

                            <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={handleAdd}>
                                Add student
                            </Button>
                        </div>
                    </div>

                    <StudentTable
                        students={listFiltered}
                        loading={loading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onDetail={handleDetail}
                    />

                    <StudentFormModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onSubmit={handleSubmit}
                        initialValues={studentSelected}
                        title={titleModal}
                        confirmLoading={confirmLoading}
                        contentSubmit={contentSubmit}
                    />

                    <StudentDetailModal
                        student={selectedDetail}
                        onClose={() => setDetailVisible(false)}
                        open={detailVisible}
                    />
                </Content>
            </Layout>
        </>
    )
}

export default StudentListPage