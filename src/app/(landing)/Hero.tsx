"use client"

import React from 'react';
import CustomButton from '@/components/forms/Button';
import { Search, Sparkles, MessageCircle, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import HeroProductCard from './HeroProductCard';

const HeroSection: React.FC = () => {
  const router = useRouter()

  const navigateToShop = () => {
    router.push("/shop")
  }

  return (
    <section className="bg-background min-h-screen w-full text-foreground overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-primary/5 h-96 w-96 rounded-full absolute top-0 right-0 blur-3xl" />
        <div className="bg-accent/5 h-96 w-96 rounded-full absolute bottom-0 left-0 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="bg-primary/10 w-fit px-4 py-2 inline-flex items-center gap-2 border border-primary/20 rounded-full">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm text-primary">
                Powered by Advanced AI
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="leading-tight font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground">
                <span>Shop Smarter with</span>
                <span className="text-primary">AI</span>
              </h1>
              <p className="max-w-lg leading-relaxed text-lg sm:text-xl text-foreground/70">
                Discover personalized recommendations, intelligent search, and 24/7 AI-powered assistance across millions of products.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 mt-0.5 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Smart Recommendations</h3>
                  <p className="text-sm text-foreground/60">Curated for you</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 mt-0.5 rounded-lg">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Semantic Search</h3>
                  <p className="text-sm text-foreground/60">Find anything instantly</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 mt-0.5 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Assistant</h3>
                  <p className="text-sm text-foreground/60">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 mt-0.5 rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Millions of Items</h3>
                  <p className="text-sm text-foreground/60">All categories</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <CustomButton className='w-fit px-4 rounded-md' label='Start Shopping' onClick={navigateToShop} />
              <CustomButton className='w-fit px-4 rounded-md' variant='primary-outline' label='Explore Products' />
            </div>

            <div className="pt-4 text-sm text-foreground/60">
              <p>✓ Trusted by millions • Free returns • Secure checkout</p>
            </div>
          </div>

          <div
            className="hidden lg:flex justify-center items-center animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="w-full max-w-md aspect-square relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl absolute inset-0" />
              <div className="bg-red-500 rounded-2xl shadow-2xl absolute inset-8" />

              <div
                className="bg-background h-40 w-32 p-4 border border-muted rounded-xl shadow-lg animate-bounce absolute -top-4 -right-4"
                style={{ animationDelay: '0s', animationDuration: '3s' }}
              >
                <HeroProductCard />
              </div>

              <div
                className="bg-background h-32 w-32 p-3 border border-muted rounded-xl shadow-lg animate-bounce absolute -bottom-6 -left-6"
                style={{ animationDelay: '0.5s', animationDuration: '3s' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-xs">AI Powered</span>
                </div>
                <div className="bg-muted h-16 rounded" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 pt-12 border-t border-muted">
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="font-heading font-bold text-2xl sm:text-3xl text-primary">50M+</p>
            <p className="mt-1 text-sm text-foreground/60">Products</p>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="font-heading font-bold text-2xl sm:text-3xl text-primary">180+</p>
            <p className="mt-1 text-sm text-foreground/60">Countries</p>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="font-heading font-bold text-2xl sm:text-3xl text-primary">24/7</p>
            <p className="mt-1 text-sm text-foreground/60">AI Support</p>
          </div>
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="font-heading font-bold text-2xl sm:text-3xl text-primary">99.9%</p>
            <p className="mt-1 text-sm text-foreground/60">Uptime</p>
          </div>
        </div>
      </div>
    </section >
  );
};

export default HeroSection;
