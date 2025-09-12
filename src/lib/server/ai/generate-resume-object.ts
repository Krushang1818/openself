"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import dedent from "dedent";

import { ResumeDataSchema } from "../../resume";

export async function generateResumeObject(resumeText: string) {
  try {
    const startTime = Date.now();

    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: ResumeDataSchema,
      maxRetries: 1,
      mode: "json",
      prompt:
        dedent(`You are an expert resume writer. Generate a resume object from the following resume text. Be professional and concise.
    ## Instructions:

    - If the resume text does not include an 'about' section or specfic skills mentioned, please generate appropriate content for these sections based on the context of the resume and based on the job role.
    - For the about section: Create a professional summary that highlights the candidate's experience, expertise, and career objectives.
    - For the skills: Generate a maximum of 10 skills taken from the ones mentioned in the resume text or based on the job role / job title infer some if not present.
    - If the resume doesn't contain the full link to social media website leave the username/link as empty strings to the specific social meda websites. The username never contains any space so make sure to only return the full username for the website otherwise don't return it.

    ## Resume text:

    ${resumeText}
    `),
    });

    const endTime = Date.now();
    console.log(
      `Generating resume object took ${(endTime - startTime) / 1000} seconds`,
    );

    return object;
  } catch (error) {
    console.error("Impossible generating resume object", error);
    return undefined;
  }
}
