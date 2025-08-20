import React, { useEffect } from 'react';
import { useLanguageStore } from './stores/languageStore';
import { useVisibilityStore } from './stores/visibilityStore';
import HeaderSection from './components/HeaderSection';
import HeroSection from './components/HeroSection';
import FooterSection from './components/FooterSection';
import ProductCategoriesSection from './components/ProductCategoriesSection';
import FeaturesSection from './components/FeaturesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import DetailedProductsSection from './components/DetailedProductsSection';

import FinalCTASection from './components/FinalCTASection';

function App() {
  const { language, isRtl } = useLanguageStore();
  const { isVisible, setupVisibilityObserver } = useVisibilityStore();

  // Setup intersection observer
  useEffect(() => {
    const cleanup = setupVisibilityObserver();
    return cleanup;
  }, [setupVisibilityObserver]);

  return (
    <div className="min-h-screen text-white overflow-x-hidden font-['Tajawal']" dir={isRtl ? "rtl" : "ltr"}>
      {/* Dark Background */}
      <div className="fixed inset-0 z-[-1] bg-gradient-dark"></div>
      
      {/* Header */}
      <HeaderSection />

      {/* Hero Section */}
      <HeroSection isVisible={true} />

      {/* Product Categories Section - قسم فئات المنتجات: الصفحات الرقمية والكروت الذكية */}
      <ProductCategoriesSection isVisible={isVisible['product-categories'] || true} />
      
      {/* Features Section - المميزات السريعة */}
      <FeaturesSection isVisible={isVisible['features'] || true} />
      
      {/* Why Choose Us Section - لماذا تختارنا */}
      <WhyChooseUsSection isVisible={isVisible['why-choose-us'] || true} />
      
      {/* Detailed Products Section - استعراض المنتجات بالتفصيل */}
      <DetailedProductsSection isVisible={isVisible['detailed-products'] || true} />
      
      {/* Pricing Section - قسم التسعير */}
      
      
      {/* Final CTA Section - دعوة للإجراء النهائي */}
      <FinalCTASection isVisible={isVisible['final-cta'] || true} />
      
      {/* Footer */}
      <FooterSection />
    </div>
  );
}

export default App;