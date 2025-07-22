import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function CustomizationShowcase() {
  return (
    <section className="py-12 md:py-24 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-8">Create Something Unique</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Link href="/customize/t-shirt">
            <Card className="relative group overflow-hidden rounded-lg shadow-lg">
              <Image src="https://placehold.co/800x600" alt="T-shirt customization" width={800} height={600} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" data-ai-hint="tshirt blank"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold font-headline text-white">Customize a T-Shirt</h3>
                <p className="text-white/80 mt-2 max-w-md">Design your own shirt from scratch with text and graphics.</p>
                <div className="mt-4">
                  <Button variant="secondary">
                    Start Designing <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
          <Link href="/customize/book">
            <Card className="relative group overflow-hidden rounded-lg shadow-lg">
              <Image src="https://placehold.co/800x600" alt="Book customization" width={800} height={600} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" data-ai-hint="book closed"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold font-headline text-white">Personalize a Book</h3>
                <p className="text-white/80 mt-2 max-w-md">Create a custom book with your own title, author, and cover.</p>
                <div className="mt-4">
                  <Button variant="secondary">
                    Start Creating <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}
