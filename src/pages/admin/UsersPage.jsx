import { Fragment, useState } from "react";
import { Button, Form, Input, Modal, Pagination, Space, Table } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useAddUsersMutation,
  useDeleteUsersMutation,
  useGetUserMutation,
  useGetUsersQuery,
  useUpdateUsersMutation,
} from "../../redux/users/user";

const UsersPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useGetUsersQuery(page);
  const [addUser] = useAddUsersMutation();
  const [getUser] = useGetUserMutation();
  const [updateUser] = useUpdateUsersMutation();
  const [deleteUser] = useDeleteUsersMutation();

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space
            size="middle"
            className="
          d-flex align-items-center justify-content-around
          "
          >
            <EditOutlined
              style={{ fontSize: "25px", color: "#0000FF" }}
              onClick={() => editUser(row._id)}
            />

            <DeleteOutlined
              style={{ fontSize: "25px", color: "#FF0E0E" }}
              onClick={async () => {
                await deleteUser(row._id);
                refetch();
              }}
            />
          </Space>
        );
      },
    },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    // setSelected(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      if (selected === null) {
        await addUser(values);
        console.log(values);
      } else {
        await updateUser({ id: selected, body: values });
      }
      closeModal();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);

  async function editUser(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getUser(id);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <Table
        bordered
        loading={isLoading}
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Users ({data?.pagination?.total})</h1>

            <Button type="primary" onClick={openModal}>
              Add user
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data?.data}
        scroll={{ x: 800 }}
        pagination={false}
      />
      <Pagination
        className="text-center my-3"
        total={data?.pagination?.total}
        current={page}
        onChange={(page) => setPage(page)}
      />
      <Modal
        title="Category data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={"Add user"}
      >
        <Form
          form={form}
          name="user"
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
            label="First Name"
            name="firstName"
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
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersPage;
