import React, { useEffect, useState, useCallback } from "react";
import { Center, color } from "@chakra-ui/react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initBgColor = 'black';

const snapGrid = [20, 20];

const statusColors = {
  green: '#00FF00',
  yellow: '#FFFF00',
  red: '#FF0000',
};

const CustomNode = ({ data }) => {
  return (
    <div style={{ padding: 20, borderRadius: 5, backgroundColor: '#f0f0f0', textAlign: 'right', color: 'black' }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: data.statusColor, marginTop: 5, margin: '0 auto' }}></div>
      <div style={{ fontWeight: 'bold', position: "relative"  }}>{data.label}</div>
    </div>
  );
};

const nodeTypes = {
  annotation: CustomNode,
};

const defaultViewport = { x: 0, y: 100, zoom: 1 };

const edgeStyles = {
  strokeWidth: 2,
  stroke: 'black',
};

export const AutomationShow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes([
      {
        id: '1',
        type: 'annotation',
        draggable: false,
        selectable: false,
        position: { x: 0, y: 50 },
        sourcePosition: 'right',
        data: {
          level: 1,
          label: 'Orchestrator',
          statusColor: statusColors.green,
        },
      },
      {
        id: '2',
        type: 'annotation',
        data: { label: 'AI Agent', statusColor: statusColors.yellow },
        position: { x: 200, y: 50 },
        targetPosition: 'left',
        sourcePosition: 'right',
      },
      {
        id: '3',
        type: 'annotation',
        data: { label: 'Tool 1', statusColor: statusColors.green },
        position: { x: 400, y: 0 },
        targetPosition: 'left',
      },
      {
        id: '4',
        type: 'annotation',
        data: { label: 'Tool 2', statusColor: statusColors.green },
        position: { x: 400, y: 100 },
        targetPosition: 'left',
      },
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: edgeStyles,
      },
      {
        id: 'e2-3',
        source: '2',
        target: '3',
        animated: true,
        style: edgeStyles,
      },
      {
        id: 'e2-4',
        source: '2',
        target: '4',
        animated: true,
        style: edgeStyles,
      },
    ]);
  }, []);

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        style={{ background: "white" }}
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        fitView
        attributionPosition="bottom-left"
      >
      </ReactFlow>
    </div>
  );
};