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
    contentSubmit: string,
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({
    visible,
    onClose,
    onSubmit,
    initialValues,
    title,
    confirmLoading,
    contentSubmit
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
                    Cancel
                </Button>,
                <Button
                    key='submit'
                    onClick={handleSubmit}
                    type='primary'
                    loading={confirmLoading}
                >
                    {contentSubmit}
                </Button>
            ]}
        >
            <Form form={form} layout='vertical' initialValues={{ remember: true}}>
                <Form.Item
                    name="fullName"
                    label="Fullname"
                    rules={[ {required: true, message: "Please enter your fullname"} ]}
                >
                    <Input placeholder='Enter your fullname'></Input>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {required: true, message: "Please enter your email"},
                        {type: "email", message: "Please enter correct email format" } 
                    ]}
                >
                    <Input placeholder='Enter your email'></Input>
                </Form.Item>
                <Form.Item
                    name="dob"
                    label="Date of birth"
                    rules={[ {required: true, message: "Please select your date of birth"} ]}
                >
                    <DatePicker
                        style={{width: "100%"}}
                        format="DD/MM/YYYY"
                    />
                </Form.Item>
                <Form.Item
                    name="class"
                    label="Class"
                    rules={[ {required: true, message: "Please enter your class"} ]}
                >
                    <Input placeholder='Enter your class'></Input>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default StudentFormModal;
        