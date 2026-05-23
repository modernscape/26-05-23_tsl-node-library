"use client"

import React, { useMemo } from "react"
import ReactFlow, { Node, NodeTypes, Background, Controls } from "reactflow"
import "reactflow/dist/style.css"
import { BaseNode } from "@/components/BaseNode"
import nodeData from "@//data/nodes.json" // 生成したJSONをインポート

// nodeDataの型定義
type NodeData = {
  id: string
  category: string
  title: string
  inputs?: { name: string }[]
  outputs?: { name: string }[]
}

export default function Home() {
  // 1. ノードの構築
  const nodes: Node[] = useMemo(() => {
    return (nodeData as NodeData[]).map((d, index) => ({
      id: d.id,
      type: "baseNode",
      // カテゴリーごとにX軸をずらして配置するロジック
      position: {
        x: (index % 4) * 300,
        y: Math.floor(index / 4) * 350,
      },
      data: d, // BaseNode にデータを渡す
    }))
  }, [])

  // 2. カスタムノードの登録
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      baseNode: BaseNode,
    }),
    [],
  )

  return (
    <div className="w-screen h-screen bg-[#1a1a1a]">
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} fitView>
        <Background color="#333" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  )
}
