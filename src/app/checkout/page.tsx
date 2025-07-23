
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { sendOrderConfirmationEmail } from "@/ai/flows/send-order-confirmation-email";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { saveOrder } from "@/services/order";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  address: z.string().min(5, { message: "Address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  postalCode: z.string().min(4, { message: "Postal code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
  paymentMethod: z.enum(["cod"], { required_error: "You need to select a payment method." }),
});

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { cartItems, clearCart, itemCount } = useCart();
  const { user, loading: authLoading } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      paymentMethod: "cod",
    },
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast({ title: 'Please Sign In', description: 'You need to be signed in to place an order.' });
        router.replace('/sign-in');
      } else if (user.email) {
        form.setValue("email", user.email);
      }
    }
    if (itemCount === 0) {
      router.replace('/');
    }
  }, [user, authLoading, form, itemCount, router, toast]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Not Signed In',
            description: "You must be signed in to place an order.",
        });
        return;
    }
    
    try {
      const orderData = {
        userId: user.uid,
        customerName: values.name,
        customerEmail: values.email,
        shippingAddress: `${values.address}, ${values.city}, ${values.postalCode}, ${values.country}`,
        orderItems: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          customization: item.customization || {},
        })),
        subtotal: subtotal,
        shipping: shipping,
        total: total,
        paymentMethod: values.paymentMethod,
        status: 'pending',
        createdAt: new Date(),
      };
      
      await saveOrder(orderData);

      const emailResult = await sendOrderConfirmationEmail({
        customerName: values.name,
        customerEmail: values.email,
        shippingAddress: `${values.address}, ${values.city}, ${values.postalCode}, ${values.country}`,
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: total.toFixed(2),
      });

      clearCart();
      toast({ title: "Success", description: `Order placed successfully! ${emailResult.message}` });
      router.push('/order-confirmation');
    } catch (error: any) {
      console.error("Order placement failed:", error);
      toast({
        variant: 'destructive',
        title: 'Order Failed',
        description: error.message || "There was an error placing your order. Please try again.",
      });
    }
  }
  
  if (authLoading || !user) {
    return (
        <div className="container py-12">
            <h1 className="text-4xl font-bold font-headline mb-8">Checkout</h1>
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Your Order</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <Skeleton className="h-24 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold font-headline mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} readOnly /></FormControl><FormMessage /></FormItem>
                  )} />
                   <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="postalCode" render={({ field }) => (
                        <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                   <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />

                  <h3 className="text-lg font-headline pt-4">Payment Method</h3>
                   <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem><FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                           <FormControl><RadioGroupItem value="cod" /></FormControl>
                           <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                        </FormItem>
                      </RadioGroup>
                      </FormControl><FormMessage /></FormItem>
                  )} />

                  <Button type="submit" size="lg" className="w-full font-bold text-lg mt-8" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Placing Order...' : `Place Order - $${total.toFixed(2)}`}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name} <span className="text-muted-foreground">x {item.quantity}</span></p>
                      {item.customization && Object.entries(item.customization).map(([key, value]) => (
                        <p key={key} className="text-sm text-muted-foreground capitalize">{key}: {value}</p>
                      ))}
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
