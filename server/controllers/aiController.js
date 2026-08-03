import { askAI } from "../services/aiService.js";
import Project from "../models/Project.js";
import Material from "../models/Material.js";
import Worker from "../models/Worker.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // Fetch data from MongoDB
    const projects = await Project.find().lean();
    const materials = await Material.find().lean();
    const workers = await Worker.find().lean();

    // Build context
    const context = `
Current BuildPilot AI Data

Total Projects: ${projects.length}
Total Materials: ${materials.length}
Total Workers: ${workers.length}

========================
PROJECTS
========================

${projects.length > 0
  ? projects
      .map(
        (p) => `
Name: ${p.name}
Client: ${p.client}
Status: ${p.status}
Progress: ${p.progress}%
Budget: Rs. ${Number(p.budget || 0).toLocaleString()}
Location: ${p.location || "Not Specified"}
`
      )
      .join("\n")
  : "No projects found."}

========================
MATERIALS
========================

${materials.length > 0
  ? materials
      .map(
        (m) => `
Material: ${m.name}
Quantity: ${m.quantity}
Unit: ${m.unit}
Cost: Rs. ${m.costPerUnit || 0}
Supplier: ${m.supplier || "N/A"}
`
      )
      .join("\n")
  : "No materials found."}

========================
WORKERS
========================

${workers.length > 0
  ? workers
      .map(
        (w) => `
Name: ${w.name}
Role: ${w.role}
Phone: ${w.phone || "N/A"}
Status: ${w.status || "Active"}
`
      )
      .join("\n")
  : "No workers found."}
`;

    const systemPrompt = `
You are BuildPilot AI.

You are an intelligent construction management assistant.

You help builders manage:

• Projects
• Budgets
• Inventory
• Workers
• Construction planning
• Reports

VERY IMPORTANT RULES:

1. Use ONLY the BuildPilot data provided below when answering questions about the user's business.

2. Do NOT invent projects, workers, materials, budgets or numbers.

3. If information is not available, politely tell the user it doesn't exist.

4. Give professional, concise and useful answers.

5. When listing data, use bullet points.

Here is the current BuildPilot database:

${context}
`;

    const reply = await askAI([
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: message,
      },
    ]);

    res.json({
      reply,
    });
  } catch (err) {
    console.error(err.response?.data || err);

    res.status(500).json({
      message: "AI request failed",
    });
  }
};