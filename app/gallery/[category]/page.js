import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import AnimatedText from "../../../components/AnimateText";
import { Reveal } from "../../../components/Reveal";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CategoryGalleryGrid from "../../../components/CategoryGalleryGrid";
import GalleryHero from "../../../components/GalleryHero";

import { categories } from "../../../lib/constants";
import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import HomePortfolioPreview from "@/components/HomePortfolioPreview";

// Generate static params for the static site generation build phase
export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export const revalidate = 3600;

export default async function GalleryPage({ params }) {
  // Extract category slug from the URL parameters
  const { category: slug } = await params;
  
  // Find the category definition based on the slug
  const currentCategory = categories.find((c) => c.slug === slug);
  
  if (!currentCategory) {
    notFound();
  }



  // Mapping between gallery category filters and backgrounds table keys
  const bgCategoryMap = {
    Maternity: "maternity",
    Newborn: "newBorn",
    Baby: "kidsToddlers",
    CakeSmash: "cakeSmash",
    Family: "family",
    Child: "childSibling",
    Fashion: "fashion",
    BathTub: "bathTub",
  };

  const [
    { data: galleryItems, error: galleryError },
    { data: bgsData, error: bgError }
  ] = await Promise.all([
    supabase
      .from('gallery_images')
      .select('id, title, category, image_urls')
      .eq('category', currentCategory.filter)
      .order('created_at', { ascending: false }),
    supabase
      .from('backgrounds')
      .select('category, image_url')
  ]);

  if (galleryError) console.error("Error fetching category images:", galleryError);
  if (bgError) console.error("Error fetching backgrounds:", bgError);
  
  const fullCategoryItems = galleryItems || [];

  // If no background banner exist, dynamically fallback to the first gallery photo they uploaded
  const dynamicFallback = fullCategoryItems.length > 0 && fullCategoryItems[0].image_urls && fullCategoryItems[0].image_urls.length > 0 
    ? fullCategoryItems[0].image_urls[0] 
    : "";

  // Hero image: find specific match or fallback
  const bgMatch = bgsData?.find(b => b.category === bgCategoryMap[currentCategory.filter]);
  const heroImageSrc = bgMatch?.image_url || dynamicFallback;

  return (
    <div className="bg-white min-h-screen text-black overflow-x-hidden font-display selection:bg-black selection:text-white">
      <Header />
      <main className="bg-neutral-50 min-h-screen">
      
      <GalleryHero 
        src={heroImageSrc} 
        title={currentCategory.name} 
        subtitle=" PORTFOLIO /GALLERY COLLECTION " 
      />

      {/* Gallery Grid */}
      <section className="py-24 px-6 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-screen-2xl mx-auto">
          <CategoryGalleryGrid items={fullCategoryItems} />
        </div>
      </section>
    </main>
    <HomePortfolioPreview header=" Explore More Portfolios" bgItems={bgsData} />
    <Footer />
    </div>
  );
}
