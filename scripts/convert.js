// scripts/convert.js
const fs = require("fs")
const csv = require("csv-parser")
const path = require("path")

// 正しいパスを指定
const csvFilePath = path.join(
  __dirname,
  "../src/data/26-05-24_tsl-nodes(nodes).csv",
)
const jsonOutputPath = path.join(__dirname, "../src/data/nodes.json")

const results = []

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (data) => {
    console.log("Raw CSV Data Row:", JSON.stringify(data))
    // 空行スキップのロジック
    if (data.name && data.name.trim() !== "") {
      results.push({
        id: data.name,
        category: data.category, // ★ここが抜けているとエラーになります
        title: data.name,
        description: data.description,
        inputs: data.inputs
          ? data.inputs.split(",").map((name) => ({ name }))
          : [],
        outputs: data.output ? [{ name: data.output }] : [],
        controls: data.controls
          ? data.controls.split(",").map((c) => {
              const [name, type, value] = c.split(":")
              return { name, type, value: parseFloat(value) }
            })
          : [],
      })
    }
  })
  .on("end", () => {
    fs.writeFileSync(jsonOutputPath, JSON.stringify(results, null, 2))
    console.log("CSV変換完了: nodes.json が生成されました")
  })
