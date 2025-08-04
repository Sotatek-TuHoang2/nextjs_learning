import { Table, Popconfirm, Tooltip, Space, Button } from 'antd'
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Student } from '@/types/Student';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


interface StudentTableProps {
    students: Student[],
    loading: boolean,
    onEdit: (student: Student) => void,
    onDelete: (id: string) => void,
    onDetail: (student: Student) => void,
}

const StudentTable: React.FC<StudentTableProps> = ({
    students,
    loading,
    onEdit,
    onDelete,
    onDetail,
}) => {
    const columns: ColumnsType<Student> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => Number(b.id) - Number(a.id)
        },
        {
            title: "Họ và tên",
            dataIndex: "fullName",
            key: "fullName",
            render: (name: string) => (
                <Space>
                    <UserOutlined style={{ color: "#1890ff" }} />
                    <span style={{ fontWeight: "500" }}>${name}</span>
                </Space>
            )
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (email: string) => (
                <a href={`mailto:${email}`} style={{ color: "#1890ff" }}>{email}</a>
            )
        },
        {
            title: "Ngày sinh",
            key: "dob",
            dataIndex: "dob",
            render: (dob: string) => new Date(dob).toLocaleDateString("vi-VN"),
        },
        {
            title: "Thao tác",
            key: "action",
            dataIndex: "action",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem chi tiết">
                        <Button
                            type='primary'
                            size='small'
                            onClick={() => onDetail(record)}
                            icon={< FontAwesomeIcon icon={faEye} />}
                        >
                            Xem chi tiết
                        </Button>
                    </Tooltip>

                    <Tooltip title="Sửa">
                        <Button
                            type='primary'
                            ghost
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => onEdit(record)}
                        >
                            Sửa
                        </Button>
                    </Tooltip>

                    <Tooltip title="Xóa">
                        <Popconfirm
                            title="Bạn có chắc sẽ xóa sinh viên này?"
                            onConfirm={() => onDelete(record.id)}
                            okText="Xóa"
                            cancelText="Hủy"
                        >
                            <Button
                                type='primary'
                                size='small'
                                danger
                                icon={<DeleteOutlined />}
                            >
                                Xóa
                            </Button>
                        </Popconfirm>
                    </Tooltip>
                </Space>
            )
        }
    ]

    return (
        <Table
            dataSource={students}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
        />
    )
}

export default StudentTable;