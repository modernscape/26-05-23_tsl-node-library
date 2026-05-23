import React from "react"
import { Handle, Position, NodeProps } from "reactflow"
import { ChevronDown, CheckSquare, Square } from "lucide-react"

type NodeData = {
  id: string // 追加: ノードを一意に識別するID
  category: string // 追加: 色分けのために必要
  title: string
  // color はカテゴリーから自動生成するようにすれば、必須ではなくなります
  color?: string
  outputs?: { name: string }[]
  inputs?: { name: string; color?: string }[]
  controls?: { name: string; type: string; value: number }[]
}

// カテゴリーと色のマッピングを定義
const getCategoryColor = (category: string) => {
  switch (category) {
    case "Math":
      return "#234050" // 青系
    case "Constants":
      return "#333333" // 濃いグレー
    case "Texture":
      return "#703010" // 茶系
    case "Logic":
      return "#503050" // 紫系
    case "Material":
      return "#1a331a" // 緑系
    default:
      return "#555555" // デフォルト
  }
}

export const BaseNode = ({ data }: NodeProps<NodeData>) => {
  const { title, category, inputs = [], outputs = [], controls = [] } = data

  // カテゴリーに基づいて色を取得
  const color = getCategoryColor(category)

  return (
    <div className="w-64 bg-[#232323] text-[#cfcfcf] rounded-md border border-[#303030] shadow-xl text-sm font-sans">
      {/* 取得した色をヘッダーに適用 */}{" "}
      <div
        style={{ backgroundColor: color }}
        className="flex items-center gap-2 p-2 rounded-t-md"
      >
        <ChevronDown size={18} />
        <span className="font-bold text-white">{title}</span>
      </div>
      <div className="p-2 space-y-3">
        {/* 1. 入力ソケット (左側) */}
        {inputs.map((input, i) => (
          <div key={i} className="flex items-center gap-2 relative">
            <Handle
              type="target"
              position={Position.Left}
              id={input.name}
              style={{ background: input.color }}
              className="!w-3 !h-3 !left-[-20px]"
            />
            <span className="text-white">{input.name}</span>
          </div>
        ))}

        {/* 2. コントロール (スライダーや数値など) */}
        {controls.map((ctrl, i) => (
          <div
            key={i}
            className="flex items-center gap-2 bg-[#404040] p-1 rounded"
          >
            <span className="w-20 truncate">{ctrl.name}</span>
            <input
              type="number"
              defaultValue={ctrl.value}
              className="w-full bg-transparent text-right outline-none text-white"
            />
          </div>
        ))}

        {/* 3. 出力ソケット (右側) */}
        {outputs.map((out, i) => (
          <div key={i} className="flex justify-end items-center gap-2 relative">
            <span className="text-white">{out.name}</span>
            <Handle
              type="source"
              position={Position.Right}
              id={out.name}
              className="!bg-pink-400 !w-3 !h-3 !right-[-20px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
