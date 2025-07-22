import Link from 'next/link';

const SocialIcon = ({ children, href }: { children: React.ReactNode, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
    {children}
  </a>
);

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-headline font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/customize/t-shirt" className="text-sm text-muted-foreground hover:text-primary">T-Shirts</Link></li>
              <li><Link href="/customize/book" className="text-sm text-muted-foreground hover:text-primary">Books</Link></li>
              <li><Link href="/#featured-products" className="text-sm text-muted-foreground hover:text-primary">Featured</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <SocialIcon href="#">
                <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.93 4.93 0 004.6 3.42 9.86 9.86 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.784.297-1.459.717-2.123 1.38C1.357 2.67.936 3.345.637 4.13c-.297.765-.497 1.635-.558 2.913-.058 1.28-.072 1.687-.072 4.947s.013 3.667.072 4.947c.06 1.278.262 2.148.558 2.913.297.783.718 1.458 1.38 2.122.662.663 1.34.082 2.122.38.765.298 1.635.498 2.913.558 1.28.058 1.687.072 4.947.072s3.667-.013 4.947-.072c1.278-.06 2.148-.262 2.913-.558.783-.298 1.458-.718 2.122-1.38.663-.662 1.082-1.34 1.38-2.122.298-.765.498-1.635.558-2.913.058-1.28.072-1.687.072-4.947s-.013-3.667-.072-4.947c-.06-1.278-.262-2.148-.558-2.913-.298-.784-.718-1.459-1.38-2.123C21.313 1.357 20.64.936 19.86.637c-.765-.297-1.635-.497-2.913-.558C15.667.015 15.26 0 12 0zm0 2.16c3.203 0 3.585.012 4.85.07 1.17.055 1.805.248 2.227.415.562.217.96.477 1.382.896.419.42.679.82.896 1.383.167.422.36 1.057.413 2.227.058 1.265.07 1.646.07 4.85s-.012 3.585-.07 4.85c-.055 1.17-.248 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.383.896-.422.167-1.057.36-2.227.413-1.265.058-1.646.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.055-1.805-.248-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.82-.896-1.383-.167-.422-.36-1.057-.413-2.227-.058-1.265-.07-1.646-.07-4.85s.012-3.585.07-4.85c.055-1.17.248-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.82-.679 1.383-.896.422-.167 1.057-.36 2.227-.413 1.265-.058 1.646-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
              </SocialIcon>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Chapter & Stitch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
