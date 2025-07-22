'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const slides = [
  {
    image: "https://placehold.co/1600x800",
    hint: "fashion model",
    title: "Wear Your Story",
    description: "Create custom t-shirts that are uniquely you. High-quality prints on comfortable fabric.",
    buttonText: "Design a T-Shirt",
    buttonLink: "/customize/t-shirt",
  },
  {
    image: "https://placehold.co/1600x800",
    hint: "book cover",
    title: "Publish Your Passion",
    description: "Bring your stories to life. Design and order your own personalized books.",
    buttonText: "Create a Book",
    buttonLink: "/customize/book",
  },
  {
    image: "https://placehold.co/1600x800",
    hint: "clothing rack",
    title: "Summer Collection is Here!",
    description: "Check out our latest featured designs, ready to ship.",
    buttonText: "Shop Now",
    buttonLink: "#featured-products",
  },
]

export function HeroSlider() {
  return (
    <section className="w-full">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[60vh] md:h-[calc(100vh-4rem)] w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  data-ai-hint={slide.hint}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white p-4 max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 drop-shadow-lg">{slide.title}</h1>
                    <p className="text-lg md:text-xl mb-8 drop-shadow">{slide.description}</p>
                    <Button asChild size="lg" className="font-bold">
                      <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/50 border-white/50" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/50 border-white/50" />
      </Carousel>
    </section>
  )
}
