import { Fragment, useState } from "react";
import { Button, Form, Input, Modal, Pagination, Space, Table } from "antd";
import {
  useAddPortfoliosMutation,
  useDeletePortfoliosMutation,
  useGetPortfolioMutation,
  useGetPortfoliosQuery,
  useUpdatePortfoliosMutation,
} from "../../redux/services/portfolioService";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Portfolios = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useGetPortfoliosQuery(page);
  const [addPortfolio] = useAddPortfoliosMutation();
  const [getPortfolio] = useGetPortfolioMutation();
  const [updatePortfolio] = useUpdatePortfoliosMutation();
  const [deletePortfolio] = useDeletePortfoliosMutation();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a rel="noreferrer" target="_blank" href={url}>
          {url}
        </a>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
              onClick={() => editPortfolio(row._id)}
            />

            <DeleteOutlined
              style={{ fontSize: "25px", color: "#FF0E0E" }}
              onClick={async () => {
                await deletePortfolio(row._id);
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
      values.photo = "6521485e1b06670014733226";
      if (selected === null) {
        await addPortfolio(values);
      } else {
        await updatePortfolio({ id: selected, body: values });
      }
      refetch();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  async function editPortfolio(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getPortfolio(id);
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
            <h1>Portfolios ({data?.pagination?.total})</h1>

            <Button type="primary" onClick={openModal}>
              Add portfolio
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
        okText={"Add portfolio"}
      >
        <Form
          form={form}
          name="portfolio"
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
            label="Portfolio name"
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
            label="Portfolio url"
            name="url"
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
            label="Description"
            name="description"
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

export default Portfolios;
