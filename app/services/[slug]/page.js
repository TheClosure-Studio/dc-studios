import { supabase } from "../../../lib/supabase";
import { categories } from "../../../lib/constants";
import { serviceDetails } from "../../../lib/serviceDetails";
import ServiceDetail from "../../../components/ServiceDetail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(serviceDetails).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  
  const detailsData = serviceDetails[slug];
  
  if (!detailsData) {
    notFound();
  }

  // Get the display title from constants
  const currentCategory = categories.find((c) => c.slug === slug);
  const serviceTitle = currentCategory?.name || detailsData.heroTitle;

  // Fetch from Supabase for dynamic image or fallback
  const { data: serviceData } = await supabase
    .from('services')
    .select('image_url')
    .eq('title', serviceTitle)
    .limit(1);
    
  let heroImage = "";

  const uploadedImage = Array.isArray(serviceData) && serviceData.length > 0 ? serviceData[0].image_url : serviceData?.image_url;

  if (uploadedImage) {
    heroImage = uploadedImage;
  } else {
    // Determine fallback
    const fallbackServices = {
      "maternity": "/toa-heftiba-C-8uOz7GluA-unsplash.jpg",
      "newborn-photography": "/nihal-karkala-M5aSbOXeDyo-unsplash.jpg",
      "baby-toddler": "/yuri-li-p0hDztR46cw-unsplash.jpg",
      "cake-smash": "/freestocks-ux53SGpRAHU-unsplash.jpg",
      "family": "/adele-morris-mDiFpFl_jTs-unsplash.jpg",
      "child-sibling": "/christian-bowen-I0ItPtIsVEE-unsplash.jpg"
    };
    heroImage = fallbackServices[slug] || '/placeholder.jpg';
  }

  return (
    <ServiceDetail 
      slug={slug} 
      serviceTitle={serviceTitle} 
      heroImage={heroImage} 
      detailsData={detailsData} 
    />
  );
}
