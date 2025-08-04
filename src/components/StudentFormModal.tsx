import { Modal, Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs'
import type { Student, StudentFormData} from '@/types/Student'
import { useEffect } from 'react';


interface StudentFormModalProps {
    visible: boolean,
    onClose: () => void,
    onSubmit: (data: StudentFormData) => void,
    initialValues?: Student;
    title: string,
    confirmLoading: boolean,
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({
    visible,
    onClose,
    onSubmit,
    initialValues,
    title,
    confirmLoading,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible) {
            form.resetFields();
            if (initialValues) {
                form.setFieldsValue({
                    ...initialValues,
                    dob: initialValues.dob ? dayjs(initialValues.dob) : undefined,
                })
            }
        }
    }, [visible, form, initialValues])

    const handleSubmit = () => {
        form.validateFields().then((value) => {
            const formattedValue = {
                ...value,
                dob: value.dob.format('YYYY-MM-DD'),
            };
            onSubmit(formattedValue);
        });
    }
    return (
        <Modal
            title={title}
            open={visible}
            onCancel={onClose}
            confirmLoading={confirmLoading}
            footer={[
                <Button
                    key='cancel'
                    onClick={onClose}
                    type='default'
                    loading={confirmLoading}
                >
                    Hủy
                </Button>,
                <Button
                    key='submit'
                    onClick={handleSubmit}
                    type='primary'
                    loading={confirmLoading}
                >
                    Lưu
                </Button>
            ]}
        >
            <Form form={form} layout='vertical' initialValues={{ remember: true}}>
                <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[ {required: true, message: "Vui lòng nhập họ tên"} ]}
                >
                    <Input placeholder='Nhập họ và tên'></Input>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {required: true, message: "Vui lòng email"},
                        {type: "email", message: "Vui lòng nhập đúng định dạng email" } 
                    ]}
                >
                    <Input placeholder='Nhập Email'></Input>
                </Form.Item>
                <Form.Item
                    name="dob"
                    label="Ngày sinh"
                    rules={[ {required: true, message: "Vui lòng nhập ngày sinh"} ]}
                >
                    <DatePicker
                        style={{width: "100%"}}
                        format="DD/MM/YYYY"
                    />
                </Form.Item>
                <Form.Item
                    name="class"
                    label="Lớp"
                    rules={[ {required: true, message: "Vui lòng nhập lớp học"} ]}
                >
                    <Input placeholder='Nhập lớp của bạn'></Input>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default StudentFormModal;
        