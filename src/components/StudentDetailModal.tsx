import { UserOutlined } from "@ant-design/icons";
import { Modal, Button, Descriptions } from 'antd';
import type { Student } from '@/types/Student';

interface StudentDetailModalProps {
    student: Student | null;
    onClose: () => void;
    open: boolean;
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
    student,
    onClose,
    open,
}) => {
    if (!student) return null;

    return (
        <Modal
            title="Thông tin chi tiết sinh viên"
            onCancel={onClose}
            open={open}
            footer={[
                <Button
                    type='primary'
                    onClick={onClose}
                    key='close'
                >
                    Đóng
                </Button>
            ]}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserOutlined style={{ color: "#1890ff", fontSize: "100px"}} />
            </div>

            <Descriptions bordered column={1}>
                <Descriptions.Item label="Họ và tên">{student.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">{new Date(student.dob).toLocaleDateString('vi-VN')}</Descriptions.Item>
                <Descriptions.Item label="Lớp">{student.class}</Descriptions.Item>
            </Descriptions>
        </Modal>
    )
}

export default StudentDetailModal;