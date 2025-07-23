'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  { name: 'Sarah L.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop', text: "The custom t-shirt I ordered exceeded my expectations! The print quality is fantastic and the shirt itself is so soft. I'll definitely be ordering more.", rating: 5, hint: "woman smiling" },
  { name: 'Mike R.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop', text: "I designed a book for my grandmother's birthday and she absolutely loved it. The process was simple and the final product was beautiful. Highly recommend!", rating: 5, hint: "man portrait" },
  { name: 'Jessica P.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop', text: "Chapter & Stitch is my new go-to for unique gifts. The quality is consistently great and their customer service is top-notch.", rating: 5, hint: "woman face" },
];

export function Testimonials() {
  return (
    <section className="py-12 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-8">What Our Customers Say</h2>
        <Carousel opts={{ align: "start", loop: true, }} className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full">
                    <CardContent className="flex flex-col items-center text-center p-6 h-full">
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm flex-grow">"{testimonial.text}"</p>
                      <p className="font-semibold font-headline">{testimonial.name}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
