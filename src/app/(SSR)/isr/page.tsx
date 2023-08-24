import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link"
import { Alert } from '@/components/bootstrap'


export const metadata = {
    title: 'Incremental Static Regeneration Fetching - NextJS 13.4 Image Generator',
}

export const revalidate = 15; // make the page revalidate every time 

export default async function DynamicPage() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY,
        { 
            // next: { revalidate: 15 }
        }
    )
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width)
    const height = (width / image.width) * image.height


    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>This page uses <strong>incremental static regeneration.</strong>
            A new image is fetched every 15 seconds (after refreshing the page).</Alert>
            <Image
                src={image.urls.raw}
                width={height}
                height={height}
                alt={image.description}
            />
            by <Link href={"/users/" + image.user.username}>{image.user.username} </Link >
        </div>
    )
}