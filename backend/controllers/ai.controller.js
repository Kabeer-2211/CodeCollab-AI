import { generateResult } from "../services/ai.service.js";

export const getResult = async (req, res) => {
    try {
        const { prompt } = req.query;
        const result = await generateResult(prompt);
        return res.status(200).send(result);
    } catch (err) {
        console.log(err);

        return res.status(500).json({ message: err.message });
    }
}