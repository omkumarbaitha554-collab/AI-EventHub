"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UnsplashImagePicker({ isOpen, onClose, onSelect, initialQuery = "event" }) {
  const [query, setQuery] = useState(initialQuery);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const searchImages = async (searchQuery) => {
    if (!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
      setError("Unsplash API Key is missing. Please check your .env.local file.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY?.trim();
      console.log("Using Unsplash Key:", accessKey ? `${accessKey.substring(0, 4)}...${accessKey.substring(accessKey.length - 4)}` : "MISSING");
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=12&client_id=${accessKey}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("The Unsplash API Key is invalid or has been disabled. Please check your dashboard.");
        }
        if (response.status === 403) {
          throw new Error("Unsplash API rate limit exceeded. Please try again later.");
        }
        throw new Error(`Unsplash API error: ${response.statusText}`);
      }

      const data = await response.json();
      setImages(data.results || []);
    } catch (err) {
      console.error("Error fetching images:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      searchImages(initialQuery || query);
    }
  }, [isOpen, initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    searchImages(query);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Choose Cover Image</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images..."
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </form>

        <div className="overflow-y-auto flex-1 -mx-6 px-6">
          {error && (
            <div className="text-center text-red-500 py-12 px-4">
              <p className="font-medium">Error searching images</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
          ) : (
            <>
              {!error && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                  {images.map((image) => (
                    <button
                      key={image.id}
                      onClick={() => onSelect(image.urls.regular)}
                      className="relative aspect-video overflow-hidden rounded-lg border-2 border-transparent hover:border-purple-500 transition-all group"
                      suppressHydrationWarning
                    >
                      <Image
                        src={image.urls.small}
                        alt={image.description || "Unsplash image"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </button>
                  ))}
                </div>
              )}

              {!error && images.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                  No images found for "{query}". Try another search.
                </div>
              )}
            </>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Photos from{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Unsplash
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
