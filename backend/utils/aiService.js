function daysBetween(startDate, endDate, fallback = 4) {
  if (!startDate || !endDate) return Number(fallback) || 4;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 && diff < 30 ? diff : Number(fallback) || 4;
}

function mockItinerary({ destination, startDate, endDate, duration, interests, travelType, travelStyle, budget }) {
  const days = duration ? Number(duration) : daysBetween(startDate, endDate, 4);
  const group = travelType && travelType !== "Solo" ? travelType.toLowerCase() : "your own pace";
  const interestText = interests || "cafes, heritage walks, and well-lit neighbourhoods";

  const itinerary = Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    let title = `Neighbourhood day ${day}`;
    if (i === 0) title = "Arrive, settle, and orient";
    if (i === days - 1) title = "Buffer morning and depart";
    return {
      day,
      title,
      items: [
        `Morning walk in a busy area of ${destination}`,
        `One main sight timed for daylight (${interestText})`,
        travelType === "Family" || travelType === "Friends"
          ? `Shared lunch nearby — easier with a ${group}`
          : "Cafe lunch and a short rest at the stay",
        "Sunset viewpoint, then dinner within a short walk of lodging",
      ],
    };
  });

  return {
    destination,
    summary: `A ${days}-day plan for ${destination} for a ${travelType || "Solo"} trip (${travelStyle || "unhurried"}). Budget around ${budget || "flexible"}. Built for daylight exploring and early evenings.`,
    itinerary,
    days: itinerary,
    placesToVisit: [
      `${destination} old town / main square`,
      "A well-reviewed cafe street",
      "Sunset viewpoint",
      "A women-hosted or 24-hour-desk stay area",
    ],
    suggestions: [
      "Keep the first night transfer pre-booked.",
      `Share the day's outline with a trusted contact — useful whether you travel ${travelType || "Solo"} or with others.`,
      "Leave one afternoon empty so the plan can breathe.",
    ],
    safetyTips: [
      "Use official taxis or in-app rides after dark.",
      "Stay in areas with evening foot traffic on the first nights.",
      "Carry a paper copy of the stay address.",
      "Agree a check-in time with someone at home.",
    ],
    recommendations: [
      "Download offline maps before you land.",
      "Pack a portable door lock and a charged power bank.",
      "Keep evenings within a 10-minute walk of the stay.",
    ],
    usedFallback: true,
  };
}

async function generateItinerary(input) {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return mockItinerary(input);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content:
              "You help women travellers plan trips (solo, friends, family, or group). Reply with JSON only.",
          },
          {
            role: "user",
            content: `Create a travel plan as JSON with keys: destination, summary, itinerary (array of {day,title,items[]}), placesToVisit[], suggestions[], safetyTips[], recommendations[]. Input: ${JSON.stringify(input)}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return mockItinerary(input);
    }

    const body = await response.json();
    const text = body.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    return {
      ...mockItinerary(input),
      ...parsed,
      days: parsed.itinerary || parsed.days,
      usedFallback: false,
    };
  } catch (_err) {
    return mockItinerary(input);
  }
}

function mockPacking({ destination, duration, travelType, travelStyle }) {
  const extraClothes =
    travelType === "Family" || travelType === "Group"
      ? "One extra outfit for shared dinners"
      : "3 modest day outfits";

  return {
    destination: destination || "Upcoming trip",
    duration: duration || "few days",
    categories: [
      {
        name: "Documents",
        items: [
          { label: "Passport / ID", packed: false },
          { label: "Trip insurance PDF", packed: false },
          { label: "Hotel confirmations", packed: false },
          { label: "Emergency contact card", packed: false },
        ],
      },
      {
        name: "Clothing",
        items: [
          { label: extraClothes, packed: false },
          { label: "Light jacket for evenings", packed: false },
          { label: "Comfortable walking shoes", packed: false },
          { label: "Dupatta / scarf", packed: false },
        ],
      },
      {
        name: "Electronics",
        items: [
          { label: "Phone + power bank", packed: false },
          { label: "Universal charger", packed: false },
          { label: "Offline maps downloaded", packed: false },
        ],
      },
      {
        name: "Medicines",
        items: [
          { label: "Personal prescriptions", packed: false },
          { label: "ORS + pain relief", packed: false },
          { label: "Sunscreen & sanitizer", packed: false },
        ],
      },
      {
        name: "Personal Items",
        items: [
          { label: "Journal", packed: false },
          { label: travelStyle ? `Items for ${travelStyle}` : "Comfort item", packed: false },
        ],
      },
      {
        name: "Safety Items",
        items: [
          { label: "Doorstop / portable lock", packed: false },
          { label: "Whistle on keychain", packed: false },
          { label: "Portable charger kept in day bag", packed: false },
        ],
      },
    ],
    usedFallback: true,
  };
}

async function generatePackingList(input) {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) return mockPacking(input);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          { role: "system", content: "Return JSON only for a packing list." },
          {
            role: "user",
            content: `JSON with destination, duration, categories: [{name, items:[{label, packed:false}]}]. Categories: Documents, Clothing, Electronics, Medicines, Personal Items, Safety Items. Input: ${JSON.stringify(input)}`,
          },
        ],
      }),
    });
    if (!response.ok) return mockPacking(input);
    const body = await response.json();
    const text = body.choices?.[0]?.message?.content || "";
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    return { ...mockPacking(input), ...parsed, usedFallback: false };
  } catch (_err) {
    return mockPacking(input);
  }
}

module.exports = { generateItinerary, generatePackingList, mockItinerary, mockPacking };
