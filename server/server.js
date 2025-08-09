import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-schedule', async (req, res) => {
    const { tasks } = req.body;
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant that creates schedules." },
                    { role: "user", content: `Make a prioritized schedule for these tasks: ${tasks.join(", ")}` }
                ]
            })
        });
        const data = await response.json();
        res.json({ schedule: data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
