import { Form, FormProps } from "antd";

type FieldType = {
  searchValue?: string;
  classMethod?: string;
  district?: string;
  ward?: string;
  city?: string;
};

const ClassListPage = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

      </Form>
    </div>
  )
}

export default ClassListPage;