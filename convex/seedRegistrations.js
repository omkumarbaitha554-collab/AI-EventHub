import { internalMutation } from "./_generated/server";

// Sample users data
const SAMPLE_USERS = [
    { name: "Alice Johnson", email: "alice@example.com", image: "https://i.pravatar.cc/150?u=alice" },
    { name: "Bob Smith", email: "bob@example.com", image: "https://i.pravatar.cc/150?u=bob" },
    { name: "Charlie Brown", email: "charlie@example.com", image: "https://i.pravatar.cc/150?u=charlie" },
    { name: "Diana Prince", email: "diana@example.com", image: "https://i.pravatar.cc/150?u=diana" },
    { name: "Evan Wright", email: "evan@example.com", image: "https://i.pravatar.cc/150?u=evan" },
    { name: "Fiona Gallagher", email: "fiona@example.com", image: "https://i.pravatar.cc/150?u=fiona" },
    { name: "George Martin", email: "george@example.com", image: "https://i.pravatar.cc/150?u=george" },
    { name: "Hannah Baker", email: "hannah@example.com", image: "https://i.pravatar.cc/150?u=hannah" },
    { name: "Ian Somerhalder", email: "ian@example.com", image: "https://i.pravatar.cc/150?u=ian" },
    { name: "Julia Roberts", email: "julia@example.com", image: "https://i.pravatar.cc/150?u=julia" },
];

export const run = internalMutation({
    handler: async (ctx) => {
        // 1. Ensure Users Exist
        const userIds = [];
        for (const userData of SAMPLE_USERS) {
            const existingUser = await ctx.db
                .query("users")
                .filter((q) => q.eq(q.field("email"), userData.email))
                .first();

            if (!existingUser) {
                const userId = await ctx.db.insert("users", {
                    email: userData.email,
                    tokenIdentifier: `seed-user-${userData.email}`,
                    name: userData.name,
                    imageUrl: userData.image,
                    hasCompletedOnboarding: true,
                    location: { city: "Mumbai", state: "Maharashtra", country: "India" },
                    interests: ["tech", "travel", "food"],
                    freeEventsCreated: 0,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });
                userIds.push(userId);
            } else {
                userIds.push(existingUser._id);
            }
        }

        if (userIds.length === 0) {
            return { success: false, message: "No users available" };
        }

        // 2. Fetch all events
        const events = await ctx.db.query("events").collect();

        if (events.length === 0) {
            return { success: false, message: "No events found. Run seed:run first." };
        }

        let totalNewRegistrations = 0;

        // 3. Register users to events
        for (const event of events) {
            const existingRegs = await ctx.db
                .query("registrations")
                .withIndex("by_event", (q) => q.eq("eventId", event._id))
                .collect();

            const currentCount = existingRegs.length;
            const targetCount = Math.min(Math.floor(Math.random() * 6) + 3, userIds.length);

            if (currentCount >= targetCount) continue;

            const needed = Math.min(targetCount - currentCount, userIds.length);
            const registeredUserIds = new Set(existingRegs.map((r) => r.userId));
            const availableUsers = userIds.filter((id) => !registeredUserIds.has(id));

            if (availableUsers.length === 0) continue;

            const shuffled = [...availableUsers].sort(() => 0.5 - Math.random());
            const selectedUsers = shuffled.slice(0, needed);

            for (const userId of selectedUsers) {
                const user = await ctx.db.get(userId);
                if (!user) continue;

                await ctx.db.insert("registrations", {
                    eventId: event._id,
                    userId,
                    attendeeName: user.name,
                    attendeeEmail: user.email,
                    qrCode: `QR-${event._id}-${userId}`,
                    checkedIn: Math.random() > 0.8,
                    status: "confirmed",
                    registeredAt: Date.now() - Math.floor(Math.random() * 86400000),
                });
                totalNewRegistrations++;
            }

            await ctx.db.patch(event._id, {
                registrationCount: currentCount + selectedUsers.length
            });
        }

        return {
            success: true,
            newRegistrations: totalNewRegistrations,
            events: events.length
        };
    },
});
