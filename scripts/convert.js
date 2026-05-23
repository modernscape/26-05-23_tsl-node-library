const fs = require("fs")
const csv = require("csv-parser")

const results = []

fs.createReadStream("nodes.csv")
  .pipe(csv())
  .on("data", (data) => {
    // 【重要】ここで name が空文字でないかチェックする
    if (data.name && data.name.trim() !== "") {
      results.push({
        id: data.name, // nameをIDとして使用
        category: data.category,
        title: data.name,
        description: data.description, // descriptionも追加
        inputs: data.inputs
          ? data.inputs.split(",").map((name) => ({ name }))
          : [],
        outputs: data.output ? [{ name: data.output }] : [],
      })
    }
  })
  .on("end", () => {
    fs.writeFileSync("nodes.json", JSON.stringify(results, null, 2))
    console.log("CSV変換完了: 空行をスキップしました")
  })
