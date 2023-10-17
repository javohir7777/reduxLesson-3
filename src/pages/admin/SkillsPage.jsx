import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Modal, Space, Table } from "antd";
import { Fragment, useEffect } from "react";
import {
  addSkill,
  controlModal,
  deleteSkill,
  editSkill,
  getSkill,
  getSkills,
  putSkill,
  showModal,
} from "../../redux/slices/skillSlice";

const SkillsPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { skills, isModalOpen, selected, loading, total, btnLoading } =
    useSelector((state) => state.skill);

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);

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
            <Button
              type="primary"
              onClick={async () => {
                await dispatch(editSkill(row._id));
                await dispatch(getSkills());
                let { payload } = await dispatch(getSkill(row._id));
                console.log(payload);
                form.setFieldsValue(payload);
              }}
            >
              Edit
            </Button>
            <Button
              danger
              type="primary"
              // loading={loading}
              onClick={async () => {
                // await dispatch(deleteSkill(row.id));
                await dispatch(deleteSkill(row._id));
                await dispatch(getSkills());
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const closeModal = () => {
    dispatch(controlModal());
  };

  const handleOk = async () => {
    try {
      let value = await form.validateFields();
      if (selected === null) {
        await dispatch(addSkill(value));
      } else {
        await dispatch(putSkill({ id: selected, value }));
      }
      closeModal();
      await dispatch(getSkills());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <Table
        loading={loading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Skills ({total})</h1>

            <Button onClick={() => dispatch(showModal(form))} type="primary">
              Add skill
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={skills}
      />
      <Modal
        title="Category data"
        confirmLoading={btnLoading}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={selected ? "Save skill" : "Add skill"}
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
