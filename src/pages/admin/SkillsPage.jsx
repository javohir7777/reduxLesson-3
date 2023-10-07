import { Button, Form, Input, Modal, Space, Table } from "antd";
import { Fragment, useState } from "react";

const SkillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const data = [];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },

    {
      title: "Action",
      render: () => {
        return (
          <Space size="middle">
            <Button type="primary">Edit</Button>
            <Button danger type="primary">
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    console.log("ok");
  };
  return (
    <Fragment>
      <Table
        // loading={loading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Skills ({data.length})</h1>
            <Button onClick={showModal} type="primary">
              Add skills
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title="Category data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={"Add skill"}
      >
        <Form
          form={form}
          name="skill"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Skills name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SkillsPage;
