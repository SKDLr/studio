
'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Shirt, Sparkles, Upload } from 'lucide-react';
import { generateProductTagline } from '@/ai/flows/generate-product-tagline';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const colors = [
    { value: 'white', label: 'White', hex: '#FFFFFF' },
    { value: 'black', label: 'Black', hex: '#111827' },
    { value: 'gray', label: 'Gray', hex: '#6b7280' },
    { value: 'red', label: 'Red', hex: '#ef4444' },
    { value: 'blue', label: 'Blue', hex: '#3b82f6' },
];

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

export function TshirtCustomizer() {
    const [color, setColor] = useState('white');
    const [size, setSize] = useState('M');
    const [text, setText] = useState('');
    const [design, setDesign] = useState<string | null>(null);
    const [taglines, setTaglines] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const { toast } = useToast();
    const { addToCart } = useCart();

    const handleDesignUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setDesign(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleGenerateTagline = async () => {
        if (!text) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please enter some text to generate taglines.' });
            return;
        }
        setIsGenerating(true);
        try {
            const result = await generateProductTagline({ productDescription: text });
            setTaglines(result.taglines);
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate taglines.' });
        }
        setIsGenerating(false);
    };

    const handleAddToCart = () => {
        addToCart({
            id: `tshirt-${color}-${size}-${text}-${Date.now()}`,
            name: 'Custom T-Shirt',
            price: 29.99,
            image: `https://placehold.co/100x100/${color.toLowerCase()}/FFFFFF?text=Tee`,
            customization: { color, size, text, design: design ? 'Custom Design' : 'None' },
        });
        toast({ title: 'Success', description: 'Custom T-Shirt added to cart!' });
    };

    const selectedColorHex = colors.find(c => c.value === color)?.hex || '#FFFFFF';
    const textColor = color === 'black' ? 'white' : 'black';


    return (
        <div className="container py-12">
            <h1 className="text-4xl font-bold font-headline mb-8">Customize Your T-Shirt</h1>
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="sticky top-24">
                    <Card>
                        <CardContent className="p-4 flex items-center justify-center aspect-square relative">
                           <svg viewBox="0 0 200 200" className="w-full h-full">
                                <path 
                                    d="M 50,5 C 50,5 55,0 65,0 H 135 C 145,0 150,5 150,5 L 185,20 L 175,50 L 140,40 V 195 H 60 V 40 L 25,50 L 15,20 L 50,5 Z" 
                                    fill={selectedColorHex} 
                                    stroke="gray" 
                                    strokeWidth="1"
                                />
                                {design && (
                                    <image href={design} x="75" y="60" height="50" width="50"/>
                                )}
                                {text && (
                                    <text
                                        x="100"
                                        y={design ? "130" : "100"}
                                        fontFamily="Arial, sans-serif"
                                        fontSize="14"
                                        fill={textColor}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        className="font-bold break-words"
                                    >
                                        {text.split(' ').map((word, index, words) => (
                                            <tspan 
                                                key={index}
                                                x="100" 
                                                dy={index === 0 ? "0" : "1.2em"}
                                            >
                                                {word}
                                            </tspan>
                                        ))}
                                    </text>
                                )}
                            </svg>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <div>
                        <Label className="text-lg font-semibold font-headline">Color</Label>
                        <RadioGroup value={color} onValueChange={setColor} className="flex flex-wrap gap-2 mt-2">
                            {colors.map(c => (
                                <div key={c.value}>
                                    <RadioGroupItem value={c.value} id={`color-${c.value}`} className="sr-only" />
                                    <Label htmlFor={`color-${c.value}`} className={`cursor-pointer rounded-full h-10 w-10 border-2 flex items-center justify-center ${color === c.value ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-gray-300'}`} style={{ backgroundColor: c.hex }} title={c.label}>
                                       {color === c.value && <div className="h-4 w-4 rounded-full" style={{backgroundColor: c.value === 'white' ? 'black' : 'white'}}></div>}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div>
                        <Label htmlFor="size-select" className="text-lg font-semibold font-headline">Size</Label>
                        <Select value={size} onValueChange={setSize}>
                            <SelectTrigger id="size-select" className="w-[180px] mt-2">
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                {sizes.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="custom-text" className="text-lg font-semibold font-headline">Add Text</Label>
                        <Input id="custom-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Your text here..." className="mt-2" />
                        <div className="mt-4">
                            <Button onClick={handleGenerateTagline} disabled={isGenerating}>
                                <Sparkles className="mr-2 h-4 w-4" /> {isGenerating ? 'Generating...' : 'Generate Taglines with AI'}
                            </Button>
                            {taglines.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <p className="font-semibold text-sm">Suggestions:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {taglines.map((tag, i) => <Button key={i} variant="outline" size="sm" onClick={() => setText(tag)}>{tag}</Button>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="design-upload" className="text-lg font-semibold font-headline">Upload Design</Label>
                        <div className="mt-2">
                            <Button asChild variant="outline">
                                <label htmlFor="design-upload" className="cursor-pointer">
                                    <Upload className="mr-2 h-4 w-4" /> Upload File
                                    <input id="design-upload" type="file" accept="image/*" className="sr-only" onChange={handleDesignUpload} />
                                </label>
                            </Button>
                        </div>
                        {design && <p className="text-sm text-muted-foreground mt-2">File uploaded.</p>}
                    </div>

                    <Button size="lg" className="w-full font-bold text-lg" onClick={handleAddToCart}>Add to Cart - $29.99</Button>
                </div>
            </div>
        </div>
    );
}
