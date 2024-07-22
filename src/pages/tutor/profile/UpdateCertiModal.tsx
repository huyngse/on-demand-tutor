import { useAppSelector } from "@/hooks/useRedux";
import { createDegree } from "@/lib/api/tutor-api";
import { Button, Form, FormProps, Input, Modal } from "antd";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    rerender: () => void;
}
type FieldType = {
    image: File;
    degreeName: string;
};
const UpdateCertiModal = ({ isModalOpen, handleOk, handleCancel, rerender }: Props) => {
    const loggedUser = useAppSelector(state => state.user.loggedUser);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<any>(null);
    const [form] = Form.useForm();
    const [image, setImage] = useState("");
    const [fileImage, setFileImage] = useState<File>();
    const handleImageClick = () => {
        inputRef.current.input.click();
    }
    const handleImageChange = (event: any) => {
        const file = event?.target.files[0];
        const renamedFile = new File([file],
            `user-profile-image-${loggedUser.userId}.${file.name.split('.').pop()}`,
            { type: file.type }
        );
        setFileImage(renamedFile);
        setImage(URL.createObjectURL(file));
    }
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        // console.log(values)
        setIsLoading(true);
        if (fileImage) {
            const updateProfileImageResult = await createDegree(loggedUser.userId, fileImage, values.degreeName);
            if (updateProfileImageResult.error) {
                toast.error("Thêm ảnh bằng cấp thất bại!");
            } else {
                toast.success("Thêm ảnh bằng cấp thành công!");
                setTimeout(() => {
                    rerender();
                }, 1000);
                handleOk();
            }
        }
        setIsLoading(false);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Modal title="Cập nhật ảnh đại diện"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={() => (<></>)}
            width={1000}
        >
            <Form
                name="update-profile-image-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <label htmlFor="degreeName" className="font-semibold">Tên bằng cấp*</label>
                <Form.Item name="degreeName" rules={[{ required: true, message: 'Vui lòng nhập tên bằng cấp!' }]}>
                    <Input type="text" placeholder="Tên bằng cấp" id="degreeName" />
                </Form.Item>
                <div className="flex flex-col gap-2 items-center">
                    {
                        image && (
                            <div className="overflow-hidden">
                                <img src={image} alt="" onClick={handleImageClick} className="w-full h-full object-cover" />
                            </div>
                        )
                    }
                </div>
                <Form.Item name="image">
                    <Input type="file" ref={inputRef} onChange={handleImageChange} />
                </Form.Item>
                <div className="flex gap-2 justify-center">
                    <Button type="default" htmlType="button" onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Form.Item className="m-0">
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Cập nhật
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default UpdateCertiModal;