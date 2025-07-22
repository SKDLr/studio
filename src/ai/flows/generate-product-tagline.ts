'use server';

/**
 * @fileOverview Generates creative taglines for new product ideas based on a short description.
 *
 * - generateProductTagline - A function that generates product taglines.
 * - GenerateProductTaglineInput - The input type for the generateProductTagline function.
 * - GenerateProductTaglineOutput - The return type for the generateProductTagline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductTaglineInputSchema = z.object({
  productDescription: z
    .string()
    .describe('A short description of the product for which to generate taglines.'),
});
export type GenerateProductTaglineInput = z.infer<typeof GenerateProductTaglineInputSchema>;

const GenerateProductTaglineOutputSchema = z.object({
  taglines: z
    .array(z.string())
    .describe('An array of creative taglines for the product.'),
});
export type GenerateProductTaglineOutput = z.infer<typeof GenerateProductTaglineOutputSchema>;

export async function generateProductTagline(input: GenerateProductTaglineInput): Promise<GenerateProductTaglineOutput> {
  return generateProductTaglineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductTaglinePrompt',
  input: {schema: GenerateProductTaglineInputSchema},
  output: {schema: GenerateProductTaglineOutputSchema},
  prompt: `You are a marketing expert specializing in creating catchy taglines.

  Generate five creative taglines for the following product description:

  {{{productDescription}}}

  Return the taglines as a JSON array.
  `,
});

const generateProductTaglineFlow = ai.defineFlow(
  {
    name: 'generateProductTaglineFlow',
    inputSchema: GenerateProductTaglineInputSchema,
    outputSchema: GenerateProductTaglineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
