'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useCart, type CartItem } from "@/context/CartContext"
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

const products: Omit<CartItem, 'quantity'>[] = [
  { id: 'prod1', name: 'The Adventurer Tee', price: 24.99, image: 'https://placehold.co/400x400', hint: 'tshirt design' },
  { id: 'prod2', name: 'Minimalist Lines Tee', price: 22.99, image: 'https://placehold.co/400x400', hint: 'abstract tshirt' },
  { id: 'prod3', name: 'Classic Hardcover', price: 39.99, image: 'https://placehold.co/400x400', hint: 'blank book' },
  { id: 'prod4', name: 'The Novelist Journal', price: 29.99, image: 'https://placehold.co/400x400', hint: 'leather journal' },
];

export function FeaturedProducts() {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Omit<CartItem, 'quantity'>) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} is now in your shopping cart.`,
    });
  }

  return (
    <section id="featured-products" className="py-12 md:py-24 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group flex flex-col">
              <CardHeader className="p-0 border-b">
                <div className="aspect-square overflow-hidden">
                  <Image src={product.image} alt={product.name} width={400} height={400} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={product.hint} />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-headline">{product.name}</CardTitle>
                <p className="text-primary font-semibold mt-2 text-xl">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
