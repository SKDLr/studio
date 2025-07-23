
'use server';

/**
 * @fileOverview A flow for sending an order confirmation email.
 * - sendOrderConfirmationEmail - A function that handles sending the email.
 * - SendOrderConfirmationEmailInput - The input type for the function.
 * - SendOrderConfirmationEmailOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OrderItemSchema = z.object({
  name: z.string().describe("The name of the item."),
  quantity: z.number().describe("The quantity of the item."),
  price: z.number().describe("The price of the item."),
});

const SendOrderConfirmationEmailInputSchema = z.object({
  customerName: z.string().describe("The name of the customer."),
  customerEmail: z.string().email().describe("The email address of the customer."),
  shippingAddress: z.string().describe("The customer's full shipping address."),
  orderItems: z.array(OrderItemSchema).describe("The items in the order."),
  total: z.string().describe("The total amount for the order."),
});
export type SendOrderConfirmationEmailInput = z.infer<typeof SendOrderConfirmationEmailInputSchema>;

const SendOrderConfirmationEmailOutputSchema = z.object({
  success: z.boolean().describe("Whether the email was sent successfully."),
  message: z.string().describe("A status message."),
});
export type SendOrderConfirmationEmailOutput = z.infer<typeof SendOrderConfirmationEmailOutputSchema>;

export async function sendOrderConfirmationEmail(
  input: SendOrderConfirmationEmailInput
): Promise<SendOrderConfirmationEmailOutput> {
  return sendOrderConfirmationEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sendOrderConfirmationEmailPrompt',
  input: { schema: SendOrderConfirmationEmailInputSchema },
  output: { schema: SendOrderConfirmationEmailOutputSchema },
  prompt: `
    You are an order fulfillment agent. 
    Your task is to send a confirmation email to a customer after they place an order.
    
    This is a simulation. You will not actually send an email, but you will generate the response as if you did.

    Order Details:
    Customer: {{{customerName}}} <{{{customerEmail}}}>
    Address: {{{shippingAddress}}}
    
    Items:
    {{#each orderItems}}
    - {{this.name}} (x{{this.quantity}}) - $\{{this.price}}
    {{/each}}

    Total: $\{{total}}

    Acknowledge that the order has been received and the email has been "sent".
    Return a success status.
  `,
});

const sendOrderConfirmationEmailFlow = ai.defineFlow(
  {
    name: 'sendOrderConfirmationEmailFlow',
    inputSchema: SendOrderConfirmationEmailInputSchema,
    outputSchema: SendOrderConfirmationEmailOutputSchema,
  },
  async (input) => {
    console.log(`Simulating sending email to ${input.customerEmail}`);
    const { output } = await prompt(input);

    // In a real application, you would integrate with an email sending service here.
    // For this example, we'll just return the simulated success message from the LLM.
    if (!output) {
        return {
            success: false,
            message: "Failed to get a response from the AI."
        }
    }

    return {
      success: true,
      message: 'Confirmation email sent successfully (simulated).',
    };
  }
);
