import { Button, Form, Input, Modal, Space, Table, message } from "antd";
import { Fragment, useState } from "react";
import { addSkill, deleteSkill } from "../../redux/slices/skillSlice";
import { useDispatch, useSelector } from "react-redux";

const SkillsPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { skills } = useSelector((state) => state.skill);
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
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary">Edit</Button>
            <Button
              danger
              type="primary"
              onClick={() => dispatch(deleteSkill(row.id))}
            >
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

  const handleOk = async () => {
    try {
      let value = await form.validateFields();
      dispatch(addSkill(value));
      closeModal();
    } catch (error) {
      message.error("Error");
    }
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
            <h1>Skills ({skills.length})</h1>
            <Button onClick={showModal} type="primary">
              Add skills
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={skills}
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
