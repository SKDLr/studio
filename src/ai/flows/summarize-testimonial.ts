'use server';

/**
 * @fileOverview An AI agent that summarizes customer testimonials.
 *
 * - summarizeTestimonial - A function that handles the summarization process.
 * - SummarizeTestimonialInput - The input type for the summarizeTestimonial function.
 * - SummarizeTestimonialOutput - The return type for the summarizeTestimonial function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTestimonialInputSchema = z.object({
  testimonial: z.string().describe('The customer testimonial to summarize.'),
});
export type SummarizeTestimonialInput = z.infer<typeof SummarizeTestimonialInputSchema>;

const SummarizeTestimonialOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the testimonial.'),
});
export type SummarizeTestimonialOutput = z.infer<typeof SummarizeTestimonialOutputSchema>;

export async function summarizeTestimonial(input: SummarizeTestimonialInput): Promise<SummarizeTestimonialOutput> {
  return summarizeTestimonialFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTestimonialPrompt',
  input: {schema: SummarizeTestimonialInputSchema},
  output: {schema: SummarizeTestimonialOutputSchema},
  prompt: `You are an expert marketing assistant. Your job is to summarize customer testimonials so store admins can quickly identify key benefits.

  Summarize the following customer testimonial:
  \"{{{testimonial}}\"`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  }
});

const summarizeTestimonialFlow = ai.defineFlow(
  {
    name: 'summarizeTestimonialFlow',
    inputSchema: SummarizeTestimonialInputSchema,
    outputSchema: SummarizeTestimonialOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
