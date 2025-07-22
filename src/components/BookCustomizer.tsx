'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Book, Sparkles, Upload } from 'lucide-react';
import { generateBookDescription } from '@/ai/flows/generate-book-description';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export function BookCustomizer() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();
    const { addToCart } = useCart();

    const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleGenerateDescription = async () => {
        if (!title || !author) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please enter a title and author.' });
            return;
        }
        setIsGenerating(true);
        try {
            const result = await generateBookDescription({ title, author });
            setDescription(result.description);
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate description.' });
        }
        setIsGenerating(false);
    };

    const handleAddToCart = () => {
        addToCart({
            id: `book-${title}-${author}-${Date.now()}`,
            name: 'Custom Book',
            price: 39.99,
            image: coverImage || 'https://placehold.co/100x150?text=Book',
            customization: { title, author, cover: coverImage ? 'Custom Cover' : 'Default' },
        });
        toast({ title: 'Success', description: 'Custom Book added to cart!' });
    };

    return (
        <div className="container py-12">
            <h1 className="text-4xl font-bold font-headline mb-8">Personalize Your Book</h1>
            <div className="grid md:grid-cols-2 gap-12">
                <Card>
                    <CardContent className="p-4 flex items-center justify-center h-full aspect-[2/3] relative bg-gray-100 overflow-hidden">
                        {coverImage ? (
                            <Image src={coverImage} alt="Book cover preview" layout="fill" objectFit="cover" />
                        ) : (
                            <div className="w-full h-full bg-primary flex flex-col items-center justify-center p-4">
                                <Book className="h-16 w-16 text-primary-foreground mb-4" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                           <h3 className="text-3xl font-bold font-headline drop-shadow-lg break-words">{title || 'Your Title'}</h3>
                           <p className="text-lg mt-1 drop-shadow">{author || 'By You'}</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <div>
                        <Label htmlFor="book-title" className="text-lg font-semibold font-headline">Title</Label>
                        <Input id="book-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., The Great Adventure" className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="book-author" className="text-lg font-semibold font-headline">Author</Label>
                        <Input id="book-author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g., Jane Doe" className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="cover-upload" className="text-lg font-semibold font-headline">Upload Cover Image</Label>
                        <div className="mt-2">
                            <Button asChild variant="outline">
                                <label htmlFor="cover-upload" className="cursor-pointer">
                                    <Upload className="mr-2 h-4 w-4" /> Upload File
                                    <input id="cover-upload" type="file" accept="image/*" className="sr-only" onChange={handleCoverUpload} />
                                </label>
                            </Button>
                        </div>
                        {coverImage && <p className="text-sm text-muted-foreground mt-2">File uploaded.</p>}
                    </div>

                    <div>
                        <Label htmlFor="book-description" className="text-lg font-semibold font-headline">Book Description</Label>
                        <div className="mt-2 space-y-2">
                             <Button onClick={handleGenerateDescription} disabled={isGenerating}>
                                <Sparkles className="mr-2 h-4 w-4" /> {isGenerating ? 'Generating...' : 'Generate with AI'}
                            </Button>
                            <Textarea id="book-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short description of your book..." rows={4}/>
                        </div>
                    </div>
                    
                    <Button size="lg" className="w-full font-bold text-lg" onClick={handleAddToCart}>Add to Cart - $39.99</Button>
                </div>
            </div>
        </div>
    );
}
