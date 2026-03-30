import { supabase } from "../../lib/supabase";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Gallery from "../../components/Gallery";


export const revalidate = 3600;

export const metadata = {
  title: "Portfolio | DC Studios",
  description: "Explore our premium portfolio featuring Maternity, Newborn, Toddler, Fashion, and Bath Tub photography. Capturing timeless moments in Tirupati.",
  openGraph: {
    title: "DC Studios Portfolio | Professional Photography",
    description: "Witness our artistic range in Newborn, maternity, and High-end conceptual Fashion & Bath Tub shoots.",
    images: ["/dc-favicon.png"],
  }
};

export default async function PortfolioPage() {
  const [{ data: galleryData }, { data: heroData }] = await Promise.all([
    supabase.from('gallery_images').select('id, title, category, image_urls').order('created_at', { ascending: false }),
    supabase.from('hero_backgrounds').select('image_url').order('display_order', { ascending: true }).order('created_at', { ascending: false }).limit(2),
  ]);


  const galleryItems = galleryData || [];

  return (
    <div className="bg-white min-h-screen text-black overflow-hidden">
      <Header />

      

      {/* Full Gallery Component */}
      <Gallery galleryItems={galleryItems} />

      <Footer />
    </div>
  );
}
