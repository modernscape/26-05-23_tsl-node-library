const csv = require("csvtojson")
const fs = require("fs")
const path = require("path")

// src/data/nodes.csv を参照するようにパスを修正
const csvFilePath = path.join(__dirname, "../src/data/nodes.csv")
const outputFilePath = path.join(__dirname, "../src/data/nodes.json")

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    const formatted = jsonObj.map((node) => ({
      id: `${node.category}-${node.name}`.toLowerCase().replace(/\s+/g, "-"),
      title: node.name,
      category: node.category,
      // カンマ区切りの入力があれば配列化、なければ空配列
      inputs: node.inputs
        ? node.inputs.split(",").map((name) => ({ name: name.trim() }))
        : [],
      outputs: node.output ? [{ name: node.output.trim() }] : [],
    }))

    fs.writeFileSync(outputFilePath, JSON.stringify(formatted, null, 2))
    console.log("✅ Success! JSON generated at src/data/nodes.json")
  })
  .catch((err) => {
    console.error("❌ Error:", err.message)
  })
