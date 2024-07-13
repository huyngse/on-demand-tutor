import { useAppSelector } from "@/hooks/useRedux";
import { uploadImage } from "@/lib/api/firebase-api";
import { updateUserProfileImage } from "@/lib/api/user-api";
import { setLoggedUser } from "@/lib/redux/userSlice";
import { Button, Form, FormProps, Input, Modal } from "antd";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

type Props = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    rerender: () => void;
}
type FieldType = {
    image: File;
};
const UpdateAvatarModal = ({ isModalOpen, handleOk, handleCancel, rerender }: Props) => {
    const loggedUser = useAppSelector(state => state.user.loggedUser);
    const dispatch = useDispatch();
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
    const onFinish: FormProps<FieldType>['onFinish'] = async (_values) => {
        if (fileImage) {
            const uploadResult = await uploadImage(fileImage);
            if (uploadResult.error) {
                toast.error("Tải ảnh lên thất bại!");
            } else {
                const imageUrl = uploadResult.data;
                const updateProfileImageResult = await updateUserProfileImage(loggedUser.userId, imageUrl);
                if (updateProfileImageResult.error) {
                    toast.error("Cập nhật ảnh đại diện thất bại!");
                } else {
                    toast.success("Cập nhật ảnh đại diện thành công!");
                    dispatch(setLoggedUser({...loggedUser, profileImage: imageUrl}));
                    setTimeout(() => {
                        rerender();
                    }, 1000);
                }
            }
            handleOk();
        }
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
        >
            <Form
                name="update-profile-image-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >

                <div className="flex flex-col gap-2 items-center">
                    {
                        image && (
                            <div className="h-[400px] w-[400px] overflow-hidden">
                                <img src={image} alt="" onClick={handleImageClick} className="w-full h-full object-cover" />
                            </div>
                        )
                    }
                    <Form.Item name="image">
                        <Input type="file" ref={inputRef} onChange={handleImageChange} />
                    </Form.Item>
                </div>
                <div className="flex gap-2 justify-center">
                    <Button type="default" htmlType="button" onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Form.Item className="m-0">
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default UpdateAvatarModal