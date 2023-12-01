// TreeNode.tsx

import {
  DeleteOutlined,
  PlusCircleOutlined,
  CheckOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Input, Button, Flex } from 'antd';
import React, { useState } from 'react';

type TreeNodeProps = {
  title: string;
  onEdit: (newTitle: string) => void;
  onDelete: () => void;
  onAddChild: () => void;
};

const TreeNode = ({ title, onEdit, onDelete, onAddChild }: TreeNodeProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEdit = () => {
    if (editMode) {
      onEdit(newTitle);
    }
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    onDelete();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  return (
    <Flex
      gap="10px"
      align="center"
      style={{
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxWidth: 'max-content',
      }}
    >
      <Input
        disabled={!editMode}
        style={{ width: '100px' }}
        placeholder="Enter new title"
        type="text"
        value={newTitle}
        onChange={handleInputChange}
      />
      <Button type="dashed" onClick={handleEdit}>
        {editMode ? <CheckOutlined /> : <EditOutlined />}
      </Button>
      <Button type="primary" onClick={onAddChild}>
        <PlusCircleOutlined />
      </Button>
      <Button danger onClick={handleDelete}>
        <DeleteOutlined />
      </Button>
    </Flex>
  );
};

export default TreeNode;
