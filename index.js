import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { spawn } from "child_process";
import fileUpload from 'express-fileupload';
import dotenv from "dotenv";

const app = express();
const PORT = 5000;

// Set up CORS middleware
app.use(cors());

// Enable file uploads
app.use(fileUpload());
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com;");
  next();
});

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI("AIzaSyD8lt6NXXNklYRfzIx5WJNk8iQimjb5MsU");

// Endpoint for processing uploaded files
app.post("/check", async (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).json({ error: "No resume file provided" });
  }
  const { jobDescription } = req.body;
  const { resume } = req.files;
  const filePath = resume.tempFilePath;

  const pythonProcess = spawn("python", ["app.py", filePath]);

  let appdata = "";

  pythonProcess.stdout.on("data", (data) => {
    appdata += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  pythonProcess.on("close", async (code) => {
    if (code === 0) {
      const prompt = `
      Act as an expert Application Tracking System (ATS) specializing in the tech field, encompassing software engineering, data science, data analysis, and big data engineering. Your objective is to assess the resume provided in ${appdata} against the given job description in ${jobDescription}. Identify missing keywords accurately in resume and list them in a structured format. The response should be presented in bullet points, numbered 1, 2, 3, 4, etc., following this structure: {{"MissingKeywords: 1, 2, 3, 4, ..."}}. Omit any details regarding match percentages and profile summaries. If you find the provided document does not meet the criteria of a resume, please reply with 'Invalid Resume'.`
      
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        res.send(text);
      } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
      }
    } else {
      console.error("Error parsing resume");
      res.status(500).send({ success: false, message: "Error parsing resume" });
    }
  });
});

app.use(cors());
app.post("/upload", async (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).json({ error: "No resume file provided" });
  }
  const { jobDescription } = req.body;
  const { resume } = req.files;
  const filePath = resume.tempFilePath;

  const pythonProcess = spawn("python", ["app.py", filePath]);

  let appdata = "";

  pythonProcess.stdout.on("data", (data) => {
    appdata += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  pythonProcess.on("close", async (code) => {
    if (code === 0) {
    const prompt3=`
    Imagine you are a seasoned Application Tracking System (ATS) with an in-depth understanding of the tech industry, including software engineering, data science, data analysis, and big data engineering. Your task is to evaluate the provided resume (${appdata}) against the given job description (${jobDescription}). Recognize the fiercely competitive job market and aim to provide optimal assistance in resume enhancement. Assign a percentage matching score based on the job description, within a range. Provide the response in a single string with the following structure: Match Percentage: "X% to X%". Ensure to consider various factors for accurate assessment. If you find the provided document does not meet the criteria of a resume, please reply with 'Invalid Resume'.`     
     try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt3);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        res.send(text);
      } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
      }
    } else {
      console.error("Error parsing resume");
      res.status(500).send({ success: false, message: "Error parsing resume" });
    }
  });
});
app.use(cors());
app.post("/summary", async (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).json({ error: "No resume file provided" });
  }
  const { jobDescription } = req.body;
  const { resume } = req.files;
  const filePath = resume.tempFilePath;

  const pythonProcess = spawn("python", ["app.py", filePath]);

  let appdata = "";

  pythonProcess.stdout.on("data", (data) => {
    appdata += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  pythonProcess.on("close", async (code) => {
    if (code === 0) {
      const prompt4=`Craft a concise profile summary for the provided resume (${appdata}) within a maximum of 8 lines. Avoid using headings; instead, express the summary in a seamless paragraph format. Capture the essence of the candidate's professional background, skills, and accomplishments, highlighting key attributes that make them a valuable asset to potential employers. Ensure the summary is engaging, impactful, and succinct, offering a clear overview of the candidate's qualifications and career trajectory.`
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt4);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        res.send(text);
      } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
      }
    } else {
      console.error("Error parsing resume");
      res.status(500).send({ success: false, message: "Error parsing resume" });
    }
  });
});

app.use(cors());
app.post("/jdsummary", async (req, res) => {
  if (!req.files || !req.files.resume) {
    return res.status(400).json({ error: "No resume file provided" });
  }
  const { jobDescription } = req.body;
  const { resume } = req.files;
  const filePath = resume.tempFilePath;

  const pythonProcess = spawn("python", ["app.py", filePath]);

  let appdata = "";

  pythonProcess.stdout.on("data", (data) => {
    appdata += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  pythonProcess.on("close", async (code) => {
    if (code === 0) {
      const prompt5=`Compose a succinct summary for the provided job description (${jobDescription}), limiting it to a maximum of 8 lines and avoiding the use of headings. Condense the essential responsibilities, qualifications, and expectations outlined in the job description into a coherent paragraph. Focus on capturing the core requirements and desired attributes sought by the employer, ensuring the summary offers a clear understanding of the role and its significance within the organization.' Aim for clarity, brevity, and relevance in conveying the job description's key elements`
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt5);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        res.send(text);
      } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
      }
    } else {
      console.error("Error parsing resume");
      res.status(500).send({ success: false, message: "Error parsing resume" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
