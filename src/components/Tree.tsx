// Tree.tsx

import { Button, Flex } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import TreeNode from './TreeNode';

type TreeElement = {
  id: number;
  title: string;
  children: TreeElement[];
  expanded: boolean;
};

const Tree = () => {
  const [tree, setTree] = useState<TreeElement[]>([
    {
      id: 1,
      title: 'First Node',
      children: [],
      expanded: true,
    },
  ]);

  const toggleExpansion = (
    nodes: TreeElement[],
    nodeId: number
  ): TreeElement[] => {
    return nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      } else if (node.children.length > 0) {
        return {
          ...node,
          children: toggleExpansion(node.children, nodeId),
        };
      }
      return node;
    });
  };

  const toggleExpand = (id: number) => {
    const updatedTree = toggleExpansion(tree, id);
    setTree(updatedTree);
  };

  const updateNodeTitle = (
    nodes: TreeElement[],
    nodeId: number,
    newTitle: string
  ): TreeElement[] => {
    return nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, title: newTitle };
      } else if (node.children.length > 0) {
        return {
          ...node,
          children: updateNodeTitle(node.children, nodeId, newTitle),
        };
      }
      return node;
    });
  };

  const editNode = (id: number, newTitle: string) => {
    const updatedTree = updateNodeTitle(tree, id, newTitle);
    setTree(updatedTree);
  };

  const deleteTreeNode = (
    nodes: TreeElement[],
    nodeId: number
  ): TreeElement[] => {
    return nodes.filter((node) => {
      if (node.id === nodeId) {
        return false;
      } else if (node.children.length > 0) {
        node.children = deleteTreeNode(node.children, nodeId);
      }
      return true;
    });
  };

  const deleteNode = (id: number) => {
    const updatedTree = deleteTreeNode(tree, id);
    setTree(updatedTree);
  };

  const addNode = (
    nodes: TreeElement[],
    parentId: number,
    title: string
  ): TreeElement[] => {
    return nodes.map((node) => {
      if (node.id === parentId) {
        node.children.push({
          id: Math.random() * 10000, // In a real scenario, you might want a better way to generate IDs
          title: title,
          children: [],
          expanded: true,
        });
      } else if (node.children.length > 0) {
        node.children = addNode(node.children, parentId, title);
      }
      return node;
    });
  };

  const addChildNode = (id: number) => {
    const updatedTree = addNode(tree, id, 'New Child');
    setTree(updatedTree);
  };

  const renderTree = (nodes: TreeElement[], depth: number = 0.5) => {
    return nodes.map((node) => (
      <div
        className="tree"
        key={node.id}
        style={{ marginLeft: `${depth * 20}px`, padding: '10px' }}
      >
        <Flex align="center" gap="10px">
          <Button onClick={() => toggleExpand(node.id)}>
            {node.expanded ? <DownOutlined /> : <RightOutlined />}
          </Button>
          <TreeNode
            title={node.title}
            onEdit={(newTitle) => editNode(node.id, newTitle)}
            onDelete={() => deleteNode(node.id)}
            onAddChild={() => addChildNode(node.id)}
          />
        </Flex>
        {node.expanded &&
          node.children.length > 0 &&
          renderTree(node.children, depth + 0.2)}
      </div>
    ));
  };

  return <div>{renderTree(tree, 0)}</div>;
};

export default Tree;
