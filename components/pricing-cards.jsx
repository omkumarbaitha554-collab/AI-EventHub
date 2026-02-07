import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export default function PricingCards({ onClose }) {
    const upgradeToPro = useMutation(api.users.upgradeSelfToPro);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = async () => {
        try {
            setIsLoading(true);
            await upgradeToPro();
            toast.success("Successfully upgraded to Pro! 🚀");
            if (onClose) onClose();
            // Refresh page to update all components
            window.location.reload();
        } catch (error) {
            toast.error("Failed to upgrade: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Free Plan */}
            <div className="border rounded-xl p-6 flex flex-col bg-card">
                <div className="mb-4">
                    <h3 className="text-xl font-bold">Free</h3>
                    <p className="text-muted-foreground text-sm">For getting started</p>
                </div>
                <div className="mb-6">
                    <span className="text-3xl font-bold">₹0</span>
                    <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        1 Event per month
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        Basic analytics
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-500" />
                        Standard support
                    </li>
                </ul>
                <Button variant="outline" disabled className="w-full">
                    Current Plan
                </Button>
            </div>

            {/* Pro Plan */}
            <div className="border rounded-xl p-6 flex flex-col bg-linear-to-b from-purple-500/10 to-transparent border-purple-500/20">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-purple-400">Pro</h3>
                    <p className="text-muted-foreground text-sm">For power users</p>
                </div>
                <div className="mb-6">
                    <span className="text-3xl font-bold">₹999</span>
                    <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-center gap-2 text-sm text-white/90">
                        <Check className="w-4 h-4 text-purple-400" />
                        Unlimited Event Creation
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white/90">
                        <Check className="w-4 h-4 text-purple-400" />
                        AI-Powered Poster Generator
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white/90">
                        <Check className="w-4 h-4 text-purple-400" />
                        Custom Themes & Branding
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white/90">
                        <Check className="w-4 h-4 text-purple-400" />
                        Priority Nationwide Reach
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white/90">
                        <Check className="w-4 h-4 text-purple-400" />
                        AI Attendee Insights
                    </li>
                    <li className="flex items-center gap-2 text-sm text-white/90">
                        <Check className="w-4 h-4 text-purple-400" />
                        Multi-Admin Access
                    </li>
                </ul>
                <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
                    onClick={handleUpgrade}
                    disabled={isLoading}
                    suppressHydrationWarning
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Upgrading...
                        </>
                    ) : (
                        "Upgrade Now"
                    )}
                </Button>
            </div>
        </div>
    );
}
