import { config } from 'dotenv';
config();

import '@/ai/flows/generate-product-tagline.ts';
import '@/ai/flows/summarize-testimonial.ts';
import '@/ai/flows/generate-book-description.ts';
import '@/ai/flows/send-order-confirmation-email.ts';
