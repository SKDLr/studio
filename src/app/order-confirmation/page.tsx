
'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="container py-24 text-center flex flex-col items-center">
      <CheckCircle2 className="mx-auto h-24 w-24 text-green-500 mb-4" />
      <h1 className="text-4xl font-bold font-headline mb-4">Order Placed Successfully!</h1>
      <p className="text-muted-foreground mb-8 max-w-prose">
        Thank you for your order. A confirmation email has been sent to your address with the order details. You will receive another notification once your order has shipped.
      </p>
      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
}
