import React, { useState, useEffect } from "react";

const steps = [
  { id: "budget", label: "Budget", icon: "💸" },
  { id: "dates", label: "Dates", icon: "📅" },
  { id: "transport", label: "Transport", icon: "🚂" },
  { id: "belgium", label: "Belgium", icon: "🇧🇪" },
  { id: "experience", label: "Vibe", icon: "🎒" },
  { id: "stay", label: "Stay", icon: "🛏️" },
  { id: "comfort", label: "Comfort", icon: "🧠" },
  { id: "paris", label: "Paris", icon: "🗼" },
  { id: "nova", label: "Nova", icon: "🧒🏽" },
  { id: "summary", label: "Summary", icon: "📝" },
];

const budgetOptions = [
  {
    value: "1500",
    label: "$1,500",
    subtitle: "Budget-conscious",
    desc: "Basic stays, cook most meals",
    icon: "🏡",
  },
  {
    value: "2500",
    label: "$2,500",
    subtitle: "Solid mid-range",
    desc: "Nice mix of dining out",
    icon: "🏨",
  },
  {
    value: "4000",
    label: "$4,000",
    subtitle: "Comfortable",
    desc: "More flexibility & activities",
    icon: "✨",
  },
  {
    value: "flex",
    label: "Flexible",
    subtitle: "Design first",
    desc: "We’ll figure it out",
    icon: "🎨",
  },
];

const veganMealOptions = [
  {
    value: "out",
    label: "Mostly Dining Out",
    subtitle: "Vegan cafés & restaurants",
    desc: "~€82/day for 3",
    icon: "🍽️",
  },
  {
    value: "mix",
    label: "Mix It Up",
    subtitle: "Some restaurants, some cooking",
    desc: "~€60/day for 3",
    icon: "🥗",
  },
  {
    value: "self",
    label: "Self-Catering",
    subtitle: "Markets & home cooking",
    desc: "~€34/day for 3",
    icon: "🛒",
  },
];

const experienceRanks = [
  "Cobblestone river towns (Dinant / villages)",
  "City days in Paris (museums & cafés)",
  "Forests & rivers (Ardennes, countryside)",
  "Markets & park picnics",
  "Vegan bistros & bakeries",
  "Classic art & architecture",
  "Science & space museums",
];

const stayRanks = [
  "Hotel – predictable, daily cleaning, front desk",
  "B&B – small scale, homier, host",
  "Apartment – kitchen, more control",
  "Unique stay – character, memorable",
];

const sensitivities = [
  "Noise (street, doors, neighbors)",
  "Crowds",
  "Strong scents / products",
  "Lighting (too bright / flicker)",
  "Cleanliness / contamination",
  "Unclear rules / surprises",
];

const novaRanks = [
  "Learning (museums, space, science, history)",
  "Adventure & nature",
  "Pure fun – rides / theme-park energy",
  "Chill & recharge days",
];

const parisMusts = [
  "Louvre / big art museum",
  "Seine river cruise",
  "Café time & people-watching",
  "Shopping (souvenirs / clothes)",
  "Disneyland Paris",
  "Big parks & playgrounds",
];

const belgiumCities = [
  "Brussels",
  "Bruges",
  "Ghent",
  "Antwerp",
  "Dinant",
  "Ardennes region",
  "Liège",
  "Namur",
  "Leuven",
  "Other / flexible",
];

const belgiumActivitiesByCategory = [
  {
    category: "🏰 History, Heritage & War Sites",
    activities: [
      "Bastogne – Battle of the Bulge Tour",
      "Ypres – City Hall WWI Tour",
      "Ypres / Flanders – WWII Tour",
      "Waterloo – Waterloo Battlefield Tour",
      "Flanders – WWI Trenches & Battlefields Tour",
      "Mons – Mons Memorial Museum",
      "Luxembourg – Day Trip to Luxembourg 🇱🇺",
      "Aachen, Germany – Germany Day Trip 🇩🇪",
      "Leuven – Guided Tour of Leuven",
      "Ghent / Bruges / Namur – Castles",
      "Bruges – Medieval architecture & canals",
      "Ghent – Medieval Boat Trip",
      "Brussels – Colonial Horrors of Leopold II Tour ⭐️",
    ],
  },
  {
    category: "🎨 Art, Design & Culture",
    activities: [
      "Mons – Van Gogh House",
      "Brussels – Atomium & Design Museum",
      "Brussels – The World of Banksy Museum",
      "Bruges – Groeninge Museum",
      "Brussels – Museum of Fine Arts",
      "Bruges – Musea Sculpta",
      "Ostend – The James Ensor House",
      "Brussels – Art Nouveau Tour",
      "Brussels – Fall & Rise of Art-Nouveau Tour",
      "Antwerp – Jewish Neighbourhood Tour",
      "Brussels – Théâtre Royal de Toone (Puppetry)",
    ],
  },
  {
    category: "🚲 Tours, Experiences & Excursions",
    activities: [
      "Multiple Cities – Hop-on Hop-off Tour",
      "Ghent – Hop-on Hop-off Water Tramway",
      "Bruges / Ghent – Bike Tour",
      "Antwerp / Bruges – Outdoor City Escape Game",
      "Brussels / Bruges – Photoshoot",
      "Bruges – Bruges VR",
      "Brussels – Place Poelaert Ferris Wheel",
      "Brussels – Brussels Eye Ferris Wheel",
      "Ghent / Bruges – River Cruises & Boat Tours",
      "Bruges – Beery Bruges Tasting Tour",
      "Flanders Region – Day Trip in Flanders",
      "Flemish Ardennes – Vintage Citroën 2CV Rental",
      "Ghent – Hot Air Balloon Tour",
    ],
  },
  {
    category: "🍫 Food, Drink & Local Life",
    activities: [
      "Multiple Cities – Chocolate & Waffles 🍫🧇",
      "Bruges / Ghent – Fries Tasting Tour 🍟",
      "Brussels / Ghent – Vegan restaurants & cafés 🌱",
      "Multiple Cities – Breweries & beer culture 🍺",
      "Multiple Cities – Markets & shopping 🛍️",
      "Maasmechelen – Outlet Shopping Trip 🛒",
    ],
  },
  {
    category: "👨‍👩‍👧‍👦 Family-Friendly & Kid Fun",
    activities: [
      "Brussels – Museum of Illusions 🪞",
      "De Panne – Plopsaland Belgium (Theme Park) 🎢",
      "De Panne – Plopsaqua De Panne (Water Park) 💦",
      "Brussels – BELvue Belgium (Kid Friendly)",
      "Multiple Cities – Parks & Playgrounds 🌳",
      "Rixensart – Garden of Lights 🌸",
      "Brussels – Comic Strip / Comic Book Walls 🎨",
    ],
  },
  {
    category: "🌿 Nature, Outdoors & Scenic Spots",
    activities: [
      "Ardennes Region – Hiking & nature ⛰️",
      "Nationwide – Local festivals & events 🎪",
      "Keukenhof / Belgian Border – See the Tulips 🌷",
      "Rixensart – Garden of Lights 🌸",
    ],
  },
  {
    category: "⚙️ Science, Innovation & Curiosity",
    activities: [
      "Brussels – Autoworld Museum 🚗",
      "Brussels – Belgium Planetarium 🔭",
      "Transinne – Eurospace Center 🚀",
      "Mechelen – Technopolis (science centre)",
      "Mechelen – Mechelen Toy Museum 🧸",
    ],
  },
  {
    category: "🎯 Adventure & Games",
    activities: [
      "Brussels / Antwerp – Axe Throwing 🎯",
      "Bruges / Brussels – Escape Room 🔐",
      "Kortrijk – Ultimate Laser Tag Experience 🔦",
      "Luxembourg – Indoor Skydiving 🪂",
    ],
  },
  {
    category: "🧠 Special Interest & Unique Museums",
    activities: [
      "Halle – Museum Halle",
      "Antwerp – MAS – Museum aan de Stroom",
      "Bruges – Diamond Museum 💎",
      "Bruges – Volkskundemuseum (Folk Museum)",
      "Bruges – Jerusalem Chapel ⛪",
    ],
  },
];

function CardOption({ option, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border p-4 transition shadow-sm hover:shadow-md
      ${
        selected
          ? "border-amber-500 bg-amber-50 ring-2 ring-amber-200"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="text-2xl flex-shrink-0">{option.icon}</div>
        <div className="min-w-0 flex-1">
          <div className="font-semibold break-words">{option.label}</div>
          {option.subtitle && (
            <div className="text-xs text-slate-500 break-words">
              {option.subtitle}
            </div>
          )}
          {option.desc && (
            <div className="mt-1 text-xs text-slate-500 break-words">
              {option.desc}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

function RankRow({ label, value, onChange }) {
  const currentValue = value || "3";
  return (
    <div className="space-y-1 w-full">
      <div className="text-sm min-w-0 break-words">{label}</div>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <input
          type="range"
          min="1"
          max="5"
          value={currentValue}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        <span>{currentValue}/5</span>
      </div>
    </div>
  );
}

function SliderRow({ label, checked, onCheck, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheck(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-amber-600"
        />
        <span>{label}</span>
      </label>
      {checked && (
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
          />
          <span>{value}/10</span>
        </div>
      )}
    </div>
  );
}

const STORAGE_KEY = "euro-trip-planner-state";

// Get default answers object
const getDefaultAnswers = () => ({
  budgetTotal: "",
  veganMeals: "mix",
  budgetFocus: "",
  tripDuration: "",
  preferredDates: { from: "", to: "" },
  campTransport: "",
  campLocationPreference: "",
  trainPreference: "",
  carRentalPreference: "",
  publicTransportPreference: "",
  transportationStyle: "",
  transportationNotes: "",
  parisDuration: "",
  parisDurationNotes: "",
  belgiumCities: [],
  belgiumOtherCity: "",
  belgiumActivities: [],
  belgiumNotes: "",
  experienceRanks: {},
  stayRanks: {},
  envComfort: [],
  sensitivities: {},
  walking: 6,
  stairs: 6,
  eiffelTime: "",
  eiffelUp: "",
  eiffelPicnic: "",
  eiffelPhotos: "",
  eiffelNotes: "",
  parisMusts: [],
  novaRanks: {},
  novaEnergy: 7,
  summaryText: "",
});

export default function App() {
  // Load initial state from localStorage
  const loadState = () => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        return {
          step: parsed.step || "budget",
          answers: parsed.answers || getDefaultAnswers(),
        };
      }
    } catch (error) {
      console.error("Error loading state from localStorage:", error);
    }
    return {
      step: "budget",
      answers: getDefaultAnswers(),
    };
  };

  const initialState = loadState();
  const [step, setStep] = useState(initialState.step);

  // central answer store
  const [answers, setAnswers] = useState(initialState.answers);

  // validation errors state
  const [errors, setErrors] = useState({});

  // email success feedback state
  const [emailSent, setEmailSent] = useState(false);

  // Save state to localStorage whenever step or answers change
  useEffect(() => {
    try {
      const stateToSave = {
        step,
        answers,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error("Error saving state to localStorage:", error);
    }
  }, [step, answers]);

  // Clear all answers and reset to initial state
  const clearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all answers? This cannot be undone."
      )
    ) {
      const defaultAnswers = getDefaultAnswers();
      // Create cleared answers with empty strings for select fields (not defaults)
      // and new instances for arrays/objects to ensure React detects changes
      const clearedAnswers = {
        ...defaultAnswers,
        veganMeals: "", // Clear to empty, not default "mix"
        // Create new array/object instances to ensure React detects the change
        belgiumCities: [...defaultAnswers.belgiumCities],
        belgiumActivities: [...defaultAnswers.belgiumActivities],
        experienceRanks: { ...defaultAnswers.experienceRanks },
        stayRanks: { ...defaultAnswers.stayRanks },
        envComfort: [...defaultAnswers.envComfort],
        sensitivities: { ...defaultAnswers.sensitivities },
        parisMusts: [...defaultAnswers.parisMusts],
        novaRanks: { ...defaultAnswers.novaRanks },
      };
      setAnswers(clearedAnswers);
      setStep("budget");
      setErrors({});
      // Clear localStorage
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    }
  };

  // Clear current step's answers
  const clearCurrentStep = () => {
    const stepLabels = {
      budget: "Budget",
      dates: "Dates",
      transport: "Transport",
      belgium: "Belgium",
      experience: "Vibe",
      stay: "Stay",
      comfort: "Comfort",
      paris: "Paris",
      nova: "Nova",
      summary: "Summary",
    };
    const stepLabel = stepLabels[step] || step;

    if (
      window.confirm(
        `Are you sure you want to clear all answers in the "${stepLabel}" section?`
      )
    ) {
      const defaultAnswers = getDefaultAnswers();
      const fieldsToClear = {};

      // Map each step to its fields
      switch (step) {
        case "budget":
          fieldsToClear.budgetTotal = "";
          fieldsToClear.veganMeals = ""; // Clear to empty, not default "mix"
          fieldsToClear.budgetFocus = "";
          break;
        case "dates":
          fieldsToClear.tripDuration = defaultAnswers.tripDuration;
          fieldsToClear.preferredDates = defaultAnswers.preferredDates;
          fieldsToClear.campTransport = defaultAnswers.campTransport;
          fieldsToClear.campLocationPreference =
            defaultAnswers.campLocationPreference;
          fieldsToClear.parisDuration = defaultAnswers.parisDuration;
          fieldsToClear.parisDurationNotes = defaultAnswers.parisDurationNotes;
          break;
        case "transport":
          fieldsToClear.trainPreference = defaultAnswers.trainPreference;
          fieldsToClear.carRentalPreference =
            defaultAnswers.carRentalPreference;
          fieldsToClear.publicTransportPreference =
            defaultAnswers.publicTransportPreference;
          fieldsToClear.transportationStyle =
            defaultAnswers.transportationStyle;
          fieldsToClear.transportationNotes =
            defaultAnswers.transportationNotes;
          break;
        case "belgium":
          // Create new array instances to ensure React detects the change
          fieldsToClear.belgiumCities = [...defaultAnswers.belgiumCities];
          fieldsToClear.belgiumOtherCity = defaultAnswers.belgiumOtherCity;
          fieldsToClear.belgiumActivities = [
            ...defaultAnswers.belgiumActivities,
          ];
          fieldsToClear.belgiumNotes = defaultAnswers.belgiumNotes;
          break;
        case "experience":
          // Create new object instance to ensure React detects the change
          fieldsToClear.experienceRanks = { ...defaultAnswers.experienceRanks };
          break;
        case "stay":
          // Create new object instance to ensure React detects the change
          fieldsToClear.stayRanks = { ...defaultAnswers.stayRanks };
          break;
        case "comfort":
          // Create new array/object instances to ensure React detects the change
          fieldsToClear.envComfort = [...defaultAnswers.envComfort];
          fieldsToClear.sensitivities = { ...defaultAnswers.sensitivities };
          fieldsToClear.walking = defaultAnswers.walking;
          fieldsToClear.stairs = defaultAnswers.stairs;
          break;
        case "paris":
          fieldsToClear.eiffelTime = defaultAnswers.eiffelTime;
          fieldsToClear.eiffelUp = defaultAnswers.eiffelUp;
          fieldsToClear.eiffelPicnic = defaultAnswers.eiffelPicnic;
          fieldsToClear.eiffelPhotos = defaultAnswers.eiffelPhotos;
          fieldsToClear.eiffelNotes = defaultAnswers.eiffelNotes;
          // Create new array instance to ensure React detects the change
          fieldsToClear.parisMusts = [...defaultAnswers.parisMusts];
          break;
        case "nova":
          // Create new object instance to ensure React detects the change
          fieldsToClear.novaRanks = { ...defaultAnswers.novaRanks };
          fieldsToClear.novaEnergy = defaultAnswers.novaEnergy;
          break;
        case "summary":
          fieldsToClear.summaryText = defaultAnswers.summaryText;
          break;
      }

      // Use setAnswers directly to ensure all fields are updated
      // Create a completely new object to ensure React detects the change
      setAnswers((prev) => {
        // Create a new object with all previous values, then override with cleared values
        const newAnswers = { ...prev };
        Object.keys(fieldsToClear).forEach((key) => {
          newAnswers[key] = fieldsToClear[key];
        });
        // Return a new object to ensure React detects the change
        return { ...newAnswers };
      });
      // Clear errors for this step
      setErrors({});
    }
  };

  const update = (patch) => {
    setAnswers((prev) => ({
      ...prev,
      ...patch,
    }));
    // Clear errors for updated fields
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(patch).forEach((key) => {
        if (newErrors[key]) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const toggleMulti = (key, value) => {
    setAnswers((prev) => {
      const current = new Set(prev[key] || []);
      if (current.has(value)) current.delete(value);
      else current.add(value);
      return { ...prev, [key]: Array.from(current) };
    });
    // Clear error for this field when user interacts
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  // Helper function to validate preferred dates
  const validatePreferredDates = (preferredDates) => {
    if (!preferredDates || typeof preferredDates === "string") {
      return "Please select preferred travel dates";
    }
    const fromDate = preferredDates.from;
    const toDate = preferredDates.to;

    // Require both dates
    if (!fromDate || !toDate) {
      return "Please select both start and end dates";
    }

    // If both dates are provided, validate that "To" is after "From"
    // Compare dates directly (YYYY-MM-DD format compares correctly as strings)
    // But use Date objects to handle edge cases
    const from = new Date(fromDate + "T00:00:00");
    const to = new Date(toDate + "T00:00:00");

    // Check if dates are valid
    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return "Please enter valid dates";
    }

    if (to < from) {
      return "End date must be after start date";
    }
    return null; // No error
  };

  // Validation functions for each step
  const validateBudgetStep = () => {
    const newErrors = {};
    if (!answers.budgetTotal) {
      newErrors.budgetTotal = "Please select a total trip budget";
    }
    if (!answers.budgetFocus) {
      newErrors.budgetFocus = "Please select a budget focus";
    }
    return newErrors;
  };

  const validateParisStep = () => {
    const newErrors = {};
    if (!answers.eiffelTime) {
      newErrors.eiffelTime = "Please select Eiffel Tower timing preference";
    }
    if (!answers.eiffelUp) {
      newErrors.eiffelUp = "Please select whether to go up the tower";
    }
    if (!answers.eiffelPicnic) {
      newErrors.eiffelPicnic = "Please select food preference";
    }
    if (!answers.eiffelPhotos) {
      newErrors.eiffelPhotos = "Please select photo priority";
    }
    return newErrors;
  };

  const validateBelgiumStep = () => {
    const newErrors = {};
    const hasOtherSelected = (answers.belgiumCities || []).includes(
      "Other / flexible"
    );
    if (hasOtherSelected && !answers.belgiumOtherCity?.trim()) {
      newErrors.belgiumOtherCity = "Please specify the city or region";
    }

    // Check that at least one activity is selected per category
    const selectedActivities = new Set(answers.belgiumActivities || []);
    belgiumActivitiesByCategory.forEach((categoryGroup) => {
      const hasSelection = categoryGroup.activities.some((activity) =>
        selectedActivities.has(activity)
      );
      if (!hasSelection) {
        newErrors[
          `belgiumActivities_${categoryGroup.category}`
        ] = `Please select at least one activity from ${categoryGroup.category}`;
      }
    });

    return newErrors;
  };

  const validateTransportStep = () => {
    const newErrors = {};
    if (!answers.trainPreference) {
      newErrors.trainPreference = "Please select a train travel preference";
    }
    if (!answers.carRentalPreference) {
      newErrors.carRentalPreference = "Please select a car rental preference";
    }
    if (!answers.publicTransportPreference) {
      newErrors.publicTransportPreference =
        "Please select a public transportation preference";
    }
    if (!answers.transportationStyle) {
      newErrors.transportationStyle =
        "Please select an overall transportation style";
    }
    return newErrors;
  };

  const validateDatesStep = () => {
    const newErrors = {};
    if (!answers.tripDuration) {
      newErrors.tripDuration = "Please select a trip duration preference";
    }
    if (!answers.campTransport) {
      newErrors.campTransport =
        "Please select transportation to/from Euro Space Camp";
    }
    if (!answers.campLocationPreference) {
      newErrors.campLocationPreference =
        "Please select where to stay during camp";
    }
    if (!answers.parisDuration) {
      newErrors.parisDuration = "Please select a Paris duration preference";
    }

    // Validate preferred dates (required)
    const dateError = validatePreferredDates(answers.preferredDates);
    if (dateError) {
      newErrors.preferredDates = dateError;
    }

    return newErrors;
  };

  const validateComfortStep = () => {
    const newErrors = {};
    if (!answers.envComfort || answers.envComfort.length === 0) {
      newErrors.envComfort =
        "Please select at least one environment & comfort preference";
    }
    if (
      !answers.sensitivities ||
      Object.keys(answers.sensitivities).length === 0
    ) {
      newErrors.sensitivities =
        "Please select at least one sensitivity to indicate";
    }
    return newErrors;
  };

  const validateStep = (stepId) => {
    switch (stepId) {
      case "budget":
        return validateBudgetStep();
      case "paris":
        return validateParisStep();
      case "belgium":
        return validateBelgiumStep();
      case "transport":
        return validateTransportStep();
      case "dates":
        return validateDatesStep();
      case "comfort":
        return validateComfortStep();
      default:
        return {}; // Other steps are optional
    }
  };

  const generateSummary = () => {
    const {
      budgetTotal,
      veganMeals,
      budgetFocus,
      tripDuration,
      preferredDates,
      campTransport,
      campLocationPreference,
      trainPreference,
      carRentalPreference,
      publicTransportPreference,
      transportationStyle,
      transportationNotes,
      parisDuration,
      parisDurationNotes,
      belgiumCities,
      belgiumOtherCity,
      belgiumActivities,
      belgiumNotes,
      experienceRanks,
      stayRanks,
      envComfort,
      sensitivities,
      walking,
      stairs,
      eiffelTime,
      eiffelUp,
      eiffelPicnic,
      eiffelPhotos,
      eiffelNotes,
      parisMusts,
      novaRanks,
      novaEnergy,
    } = answers;

    const formatRankBlock = (obj) =>
      Object.entries(obj)
        .filter(([, v]) => v)
        .sort((a, b) => Number(a[1]) - Number(b[1]))
        .map(([label, v]) => `- ${label}: priority ${v}/5`)
        .join("\n") || "None set yet.";

    const sensitivityBlock =
      Object.keys(sensitivities).length === 0
        ? "No specific sensitivities checked."
        : Object.entries(sensitivities)
            .map(([label, v]) => `- ${label}: importance ${v}/10`)
            .join("\n");

    const formatDateRange = (dates) => {
      // Handle backward compatibility with string format
      if (typeof dates === "string") {
        return dates || "Not specified yet";
      }
      if (!dates || (!dates.from && !dates.to)) {
        return "Not specified yet";
      }
      if (dates.from && dates.to) {
        const fromDate = new Date(dates.from).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const toDate = new Date(dates.to).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return `${fromDate} - ${toDate}`;
      }
      if (dates.from) {
        return `From ${new Date(dates.from).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`;
      }
      if (dates.to) {
        return `Until ${new Date(dates.to).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`;
      }
      return "Not specified yet";
    };

    const body = `
Europe Trip Questionnaire – Tyler & Nova
========================================

Travel Dates & Duration
------------------------
- Trip duration preference: ${tripDuration || "Not specified yet"}
- Preferred dates: ${formatDateRange(preferredDates)}

Euro Space Camp (Aug 24-28, Libin)
----------------------------------
- Transportation to/from camp: ${campTransport || "Not specified yet"}
- Location preference during camp: ${
      campLocationPreference || "Not specified yet"
    }
Note: Euro Space Camp is in Libin and not immediately near any rail stations.

Transportation Preferences
--------------------------
- Train preference: ${trainPreference || "Not specified yet"}
- Car rental preference: ${carRentalPreference || "Not specified yet"}
- Public transportation preference: ${
      publicTransportPreference || "Not specified yet"
    }
- Transportation style: ${transportationStyle || "Not specified yet"}
${transportationNotes ? `- Transportation notes: ${transportationNotes}` : ""}

Paris Leg
---------
- Paris duration preference: ${parisDuration || "Not specified yet"}
${parisDurationNotes ? `- Paris duration notes: ${parisDurationNotes}` : ""}

Belgium Preferences
-------------------
- Cities/regions of interest: ${
      belgiumCities && belgiumCities.length
        ? (() => {
            const citiesList = [...belgiumCities];
            // Replace "Other / flexible" with the actual input if provided
            const otherIndex = citiesList.indexOf("Other / flexible");
            if (otherIndex !== -1 && belgiumOtherCity?.trim()) {
              citiesList[otherIndex] = `Other: ${belgiumOtherCity.trim()}`;
            } else if (otherIndex !== -1) {
              citiesList[otherIndex] = "Other / flexible";
            }
            return citiesList.join(", ");
          })()
        : "Not specified yet"
    }
- Activities of interest: ${
      belgiumActivities && belgiumActivities.length
        ? belgiumActivities.join(", ")
        : "Not specified yet"
    }
${belgiumNotes ? `- Other Belgium notes: ${belgiumNotes}` : ""}

Budget & Food
-------------
- Total shared budget (excluding lodging gift): ${
      budgetTotal || "Not chosen yet"
    }
- Vegan meal approach: ${
      veganMealOptions.find((o) => o.value === veganMeals)?.label ||
      "Not chosen yet"
    }
- Budget focus: ${budgetFocus || "Not set yet"}

Experience Priorities (1 = must-do, 5 = nice-to-have)
------------------------------------------------------
${formatRankBlock(experienceRanks)}

Accommodation Priorities (1 = ideal, 5 = low priority)
------------------------------------------------------
${formatRankBlock(stayRanks)}

Environment & Comfort
---------------------
- Space vibes that feel good: ${
      envComfort && envComfort.length
        ? envComfort.join("; ")
        : "Not specified yet."
    }

Sensitivities (1 = low, 10 = very important)
--------------------------------------------
${sensitivityBlock}

Mobility
--------
- Walking / standing comfort: ${walking}/10
- Stairs comfort: ${stairs}/10

Paris & Eiffel Tower Day
------------------------
- Eiffel Tower timing: ${eiffelTime || "Not chosen"}
- Going up vs. viewing: ${eiffelUp || "Not chosen"}
- Picnic vs. meal: ${eiffelPicnic || "Not chosen"}
- Photos priority: ${eiffelPhotos || "Not chosen"}
- Eiffel Tower extra notes: ${eiffelNotes || "None yet."}

Paris Must-Dos
--------------
- ${
      parisMusts && parisMusts.length
        ? parisMusts.join("\n- ")
        : "No must-dos selected yet."
    }

Nova – Priorities (1 = favorite, 5 = low priority)
---------------------------------------------------
${formatRankBlock(novaRanks)}
- Big-day energy: ${novaEnergy}/10

Vegan Travel Note
-----------------
We’ll prioritize vegan-friendly restaurants, bakeries, and markets, and keep supermarket-friendly options ready for train days and lower-energy moments.

(You can edit this text before sending to Lib.)
`.trim();

    update({ summaryText: body });
    setStep("summary");
  };

  const copySummary = () => {
    if (!answers.summaryText) {
      alert("Please generate a summary first.");
      return;
    }
    navigator.clipboard.writeText(answers.summaryText);
    alert("Copied summary to clipboard.");
  };

  const emailSummary = () => {
    if (!answers.summaryText) {
      alert("Please generate a summary first.");
      return;
    }
    const to = "lib@example.com"; // TODO: your real email
    const subject = "Europe Trip Questionnaire – Tyler & Nova";
    const link = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(answers.summaryText)}`;
    window.location.href = link;
    // Show success feedback
    setEmailSent(true);
    // Clear the success message after 5 seconds
    setTimeout(() => setEmailSent(false), 5000);
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.findIndex((s) => s.id === step);
    if (currentIndex > 0) {
      const previousStep = steps[currentIndex - 1];
      setStep(previousStep.id);
      // Clear errors when going back
      setErrors({});
      // Scroll to top when navigating to previous page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToNextStep = () => {
    // Validate current step before proceeding
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    const currentIndex = steps.findIndex((s) => s.id === step);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      if (nextStep.id === "summary") {
        // Generate summary before going to summary step
        generateSummary();
      } else {
        setStep(nextStep.id);
      }
      // Scroll to top when navigating to next page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepNavigation = (stepId) => {
    // Don't validate if clicking on the same step
    if (stepId === step) {
      return;
    }

    const currentIndex = steps.findIndex((s) => s.id === step);
    const targetIndex = steps.findIndex((s) => s.id === stepId);

    // If navigating forward or sideways (not backwards), validate current step first
    if (targetIndex > currentIndex) {
      const stepErrors = validateStep(step);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        // Scroll to top to show errors
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    // Clear errors if validation passes or navigating backwards
    setErrors({});

    if (stepId === "summary") {
      // Generate summary before going to summary step
      generateSummary();
    } else {
      setStep(stepId);
    }
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // STEP RENDERERS
  const renderBudgetStep = () => (
    <div className="space-y-8 w-full min-w-0 text-center">
      <section className="space-y-3 text-center border-b border-slate-200 pb-6">
        <h1 className="text-xl font-serif tracking-wide text-slate-900">
          Budget Framework
        </h1>
        <p className="text-xs uppercase tracking-[0.2em] text-amber-700">
          Excluding Space Camp fees and flights
        </p>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-900 flex gap-3">
          <span className="text-xl flex-shrink-0">🎁</span>
          <div className="min-w-0 flex-1">
            <div className="font-semibold mb-1 hidden min-[401px]:block">
              Good news: accommodation is covered!
            </div>
            <p className="mb-1">
              <strong>$3,000</strong> for lodging is already covered.
            </p>
            <p className="break-words">
              You'll mostly be deciding how to use your budget for food,
              transport, and activities.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3 text-center border-b border-slate-200 pb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Total trip budget for shared expenses
        </h2>
        {errors.budgetTotal && (
          <p className="text-xs text-red-600 font-medium">
            {errors.budgetTotal}
          </p>
        )}
        <div className="grid gap-4 md:grid-cols-4">
          {budgetOptions.map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.budgetTotal === opt.value}
              onSelect={() => update({ budgetTotal: opt.value })}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3 text-center border-b border-slate-200 pb-6">
        <h2 className="text-lg font-semibold text-slate-800">
          Vegan meal approach
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {veganMealOptions.map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.veganMeals === opt.value}
              onSelect={() => update({ veganMeals: opt.value })}
            />
          ))}
        </div>
      </section>

      <section className="space-y-2 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Where should the money go?
        </h2>
        {errors.budgetFocus && (
          <p className="text-xs text-red-600 font-medium">
            {errors.budgetFocus}
          </p>
        )}
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              value: "experiences",
              label: "Prioritize Experiences",
              desc: "Keep things simple on food & stays, splurge on memories.",
              icon: "🎭",
            },
            {
              value: "comfort",
              label: "Prioritize Comfort",
              desc: "Invest in where you stay and how smooth the days feel.",
              icon: "🛏️",
            },
            {
              value: "balanced",
              label: "Balanced",
              desc: "A little comfort, a little adventure.",
              icon: "⚖️",
            },
          ].map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.budgetFocus === opt.value}
              onSelect={() => update({ budgetFocus: opt.value })}
            />
          ))}
        </div>
      </section>
    </div>
  );

  const renderDatesStep = () => (
    <div className="space-y-6 w-full min-w-0 text-center">
      <section className="space-y-3 text-center">
        <h1 className="text-xl font-serif tracking-wide text-slate-900">
          Travel Dates & Duration
        </h1>
        <p className="text-sm text-slate-500">
          Help us plan the timing and logistics of your trip
        </p>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Trip duration preference
        </h2>
        {errors.tripDuration && (
          <p className="text-xs text-red-600 font-medium">
            {errors.tripDuration}
          </p>
        )}
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              value: "1-week",
              label: "About 1 week",
              desc: "7-9 days",
              icon: "📆",
            },
            {
              value: "2-weeks",
              label: "About 2 weeks",
              desc: "12-15 days",
              icon: "🗓️",
            },
            {
              value: "flexible",
              label: "Flexible",
              desc: "Open to suggestions",
              icon: "✨",
            },
          ].map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.tripDuration === opt.value}
              onSelect={() => update({ tripDuration: opt.value })}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Preferred travel dates
        </h2>
        {errors.preferredDates && (
          <p className="text-xs text-red-600 font-medium">
            {errors.preferredDates}
          </p>
        )}
        <div className="flex gap-3 items-center justify-center">
          <div className="flex-1">
            <label className="block text-xs text-slate-600 mb-1 text-left">
              From
            </label>
            <input
              type="date"
              value={
                typeof answers.preferredDates === "string"
                  ? ""
                  : answers.preferredDates?.from || ""
              }
              onChange={(e) => {
                const newPreferredDates = {
                  from: e.target.value,
                  to:
                    typeof answers.preferredDates === "string"
                      ? ""
                      : answers.preferredDates?.to || "",
                };
                // Update answers
                setAnswers((prev) => ({
                  ...prev,
                  preferredDates: newPreferredDates,
                }));
                // Validate and update errors in the same batch
                const dateError = validatePreferredDates(newPreferredDates);
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  if (dateError) {
                    newErrors.preferredDates = dateError;
                  } else {
                    delete newErrors.preferredDates;
                  }
                  return newErrors;
                });
              }}
              className={`w-full rounded-2xl border px-3 py-2 text-sm ${
                errors.preferredDates
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 bg-white"
              }`}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-slate-600 mb-1 text-left">
              To
            </label>
            <input
              type="date"
              value={
                typeof answers.preferredDates === "string"
                  ? ""
                  : answers.preferredDates?.to || ""
              }
              onChange={(e) => {
                const newPreferredDates = {
                  from:
                    typeof answers.preferredDates === "string"
                      ? ""
                      : answers.preferredDates?.from || "",
                  to: e.target.value,
                };
                // Update answers
                setAnswers((prev) => ({
                  ...prev,
                  preferredDates: newPreferredDates,
                }));
                // Validate and update errors in the same batch
                const dateError = validatePreferredDates(newPreferredDates);
                setErrors((prev) => {
                  const newErrors = { ...prev };
                  if (dateError) {
                    newErrors.preferredDates = dateError;
                  } else {
                    delete newErrors.preferredDates;
                  }
                  return newErrors;
                });
              }}
              min={
                typeof answers.preferredDates === "string"
                  ? undefined
                  : answers.preferredDates?.from || undefined
              }
              className={`w-full rounded-2xl border px-3 py-2 text-sm ${
                errors.preferredDates
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 bg-white"
              }`}
            />
          </div>
        </div>
      </section>

      <section className="space-y-3 text-center">
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-blue-900 flex gap-3">
          <span className="text-xl flex-shrink-0">🏕️</span>
          <div className="min-w-0 flex-1">
            <div className="font-semibold mb-1">Euro Space Camp: Aug 24-28</div>
            <p className="break-words">
              Nova will be at overnight camp in <strong>Libin, Belgium</strong>{" "}
              during these dates. The camp is not immediately near any rail
              stations.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Transportation to/from Euro Space Camp
        </h2>
        <p className="text-xs text-slate-500 border-b border-slate-200 pb-3">
          How would you prefer to get to Libin for drop-off and pick-up?
        </p>
        {errors.campTransport && (
          <p className="text-xs text-red-600 font-medium">
            {errors.campTransport}
          </p>
        )}
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              value: "rent-car",
              label: "Rent a car",
              desc: "Flexibility to explore nearby",
              icon: "🚗",
            },
            {
              value: "taxi",
              label: "Taxi / Private transfer",
              desc: "Convenient, no driving needed",
              icon: "🚕",
            },
            {
              value: "train-plus",
              label: "Train + local transport",
              desc: "Train to nearest station, then taxi/bus",
              icon: "🚂",
            },
            {
              value: "flexible",
              label: "Flexible / Open to options",
              desc: "Whatever works best",
              icon: "🤔",
            },
          ].map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.campTransport === opt.value}
              onSelect={() => update({ campTransport: opt.value })}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Where to stay during camp (Aug 24-28)?
        </h2>
        <p className="text-xs text-slate-500 border-b border-slate-200 pb-3">
          Would you prefer to stay nearby Libin or further away?
        </p>
        {errors.campLocationPreference && (
          <p className="text-xs text-red-600 font-medium">
            {errors.campLocationPreference}
          </p>
        )}
        <div className="grid gap-3 md:grid-cols-2">
          {[
            {
              value: "nearby",
              label: "Stay nearby Libin",
              desc: "Easy access for drop-off/pick-up, explore Ardennes region",
              icon: "🏔️",
            },
            {
              value: "further",
              label: "Stay further away",
              desc: "Use this time to explore other areas, return for pick-up",
              icon: "🗺️",
            },
            {
              value: "flexible",
              label: "Flexible / Open to suggestions",
              desc: "Whatever makes sense for the trip",
              icon: "✨",
            },
          ].map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.campLocationPreference === opt.value}
              onSelect={() => update({ campLocationPreference: opt.value })}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">Paris duration</h2>
        <p className="text-xs text-slate-500 border-b border-slate-200 pb-3">
          How many days would you like to spend in Paris?
        </p>
        {errors.parisDuration && (
          <p className="text-xs text-red-600 font-medium">
            {errors.parisDuration}
          </p>
        )}
        <div className="grid gap-3 md:grid-cols-4">
          {[
            {
              value: "2-3-days",
              label: "2-3 days",
              desc: "Quick visit",
              icon: "⚡",
            },
            {
              value: "4-5-days",
              label: "4-5 days",
              desc: "Comfortable stay",
              icon: "🏛️",
            },
            {
              value: "6-plus-days",
              label: "6+ days",
              desc: "Extended exploration",
              icon: "🗼",
            },
            {
              value: "flexible",
              label: "Flexible",
              desc: "Open to suggestions",
              icon: "✨",
            },
          ].map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.parisDuration === opt.value}
              onSelect={() => update({ parisDuration: opt.value })}
            />
          ))}
        </div>
      </section>

      <section className="space-y-2 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Paris duration notes (optional)
        </h2>
        <textarea
          value={answers.parisDurationNotes}
          onChange={(e) => update({ parisDurationNotes: e.target.value })}
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
          placeholder="Any thoughts on what you'd like to do in Paris, or how many days you think would work best given your expectations..."
          rows={3}
        />
      </section>
    </div>
  );

  const renderTransportStep = () => (
    <div className="space-y-6 w-full min-w-0 text-center">
      <section className="space-y-3 text-center">
        <h1 className="text-xl font-serif tracking-wide text-slate-900">
          Transportation Preferences
        </h1>
        <p className="text-sm text-slate-500">
          How do you prefer to get around during your trip?
        </p>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Train travel preference
        </h2>
        <p className="text-xs text-slate-500 border-b border-slate-200 pb-3">
          How do you feel about train travel between cities?
        </p>
        {errors.trainPreference && (
          <p className="text-xs text-red-600 font-medium">
            {errors.trainPreference}
          </p>
        )}
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              value: "love-trains",
              label: "Love trains",
              desc: "Prefer trains for most inter-city travel",
              icon: "🚂",
            },
            {
              value: "trains-ok",
              label: "Trains are fine",
              desc: "Happy to use trains when convenient",
              icon: "✅",
            },
            {
              value: "prefer-other",
              label: "Prefer other options",
              desc: "Would rather drive or use other transport",
              icon: "🚗",
            },
            {
              value: "flexible",
              label: "Flexible",
              desc: "Whatever works best for the route",
              icon: "✨",
            },
          ].map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.trainPreference === opt.value}
              onSelect={() => update({ trainPreference: opt.value })}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Car rental preference
        </h2>
        <p className="text-xs text-slate-500 border-b border-slate-200 pb-3">
          Would you like to rent a car for part or all of the trip?
        </p>
        {errors.carRentalPreference && (
          <p className="text-xs text-red-600 font-medium">
            {errors.carRentalPreference}
          </p>
        )}
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              value: "yes-rental",
              label: "Yes, rent a car",
              desc: "Want flexibility to explore",
              icon: "🚗",
            },
            {
              value: "maybe-rental",
              label: "Maybe, if needed",
              desc: "Open to it for specific parts",
              icon: "🤔",
            },
            {
              value: "no-rental",
              label: "No car rental",
              desc: "Prefer trains and public transport",
              icon: "🚂",
            },
            {
              value: "flexible",
              label: "Flexible",
              desc: "Open to suggestions",
              icon: "✨",
            },
          ].map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.carRentalPreference === opt.value}
              onSelect={() => update({ carRentalPreference: opt.value })}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Public transportation (within cities)
        </h2>
        <p className="text-xs text-slate-500 border-b border-slate-200 pb-3">
          How do you feel about using metro, buses, and trams in cities?
        </p>
        {errors.publicTransportPreference && (
          <p className="text-xs text-red-600 font-medium">
            {errors.publicTransportPreference}
          </p>
        )}
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              value: "love-public",
              label: "Love public transport",
              desc: "Prefer metro/bus/tram for city travel",
              icon: "🚇",
            },
            {
              value: "public-ok",
              label: "Public transport is fine",
              desc: "Happy to use when convenient",
              icon: "✅",
            },
            {
              value: "prefer-walking",
              label: "Prefer walking",
              desc: "Would rather walk when possible",
              icon: "🚶",
            },
            {
              value: "flexible",
              label: "Flexible",
              desc: "Mix of walking and transport",
              icon: "✨",
            },
          ].map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.publicTransportPreference === opt.value}
              onSelect={() => update({ publicTransportPreference: opt.value })}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Overall transportation style
        </h2>
        <p className="text-xs text-slate-500 border-b border-slate-200 pb-3">
          What's your preferred approach to getting around?
        </p>
        {errors.transportationStyle && (
          <p className="text-xs text-red-600 font-medium">
            {errors.transportationStyle}
          </p>
        )}
        <div className="grid gap-3 md:grid-cols-2">
          {[
            {
              value: "efficient",
              label: "Efficient & direct",
              desc: "Fast routes, minimize transfers",
              icon: "⚡",
            },
            {
              value: "scenic",
              label: "Scenic routes",
              desc: "Enjoy the journey, not just destination",
              icon: "🌄",
            },
            {
              value: "budget-conscious",
              label: "Budget-conscious",
              desc: "Prioritize cost-effective options",
              icon: "💰",
            },
            {
              value: "comfort-first",
              label: "Comfort first",
              desc: "Prioritize ease and convenience",
              icon: "🛋️",
            },
            {
              value: "flexible",
              label: "Flexible",
              desc: "Mix of approaches as needed",
              icon: "✨",
            },
          ].map((opt) => (
            <CardOption
              key={opt.value}
              option={opt}
              selected={answers.transportationStyle === opt.value}
              onSelect={() => update({ transportationStyle: opt.value })}
            />
          ))}
        </div>
      </section>

      <section className="space-y-2 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Transportation notes (optional)
        </h2>
        <textarea
          value={answers.transportationNotes}
          onChange={(e) => update({ transportationNotes: e.target.value })}
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
          placeholder="Any specific transportation preferences, concerns, or requirements (e.g., accessibility needs, motion sickness, preferred train classes, etc.)..."
          rows={3}
        />
      </section>
    </div>
  );

  const renderBelgiumStep = () => (
    <div className="space-y-6 w-full min-w-0 text-center">
      <section className="space-y-3 text-center">
        <h1 className="text-xl font-serif tracking-wide text-slate-900">
          Belgium Preferences
        </h1>
        <p className="text-sm text-slate-500">
          Help us plan your time in Belgium (focus is on Paris, so this is
          limited)
        </p>
      </section>

      {/* Belgium Images Gallery */}
      <section className="space-y-3">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={`${import.meta.env.BASE_URL}images/belgium-main.jpg`}
            alt="Belgium"
            className="w-full h-48 md:h-64 object-cover"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <img
            src={`${import.meta.env.BASE_URL}images/belgium-1.jpg`}
            alt="Belgium"
            className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/belgium-3.jpg`}
            alt="Belgium"
            className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/belgium-4.jpg`}
            alt="Belgium"
            className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Cities & regions of interest
        </h2>
        <p className="text-xs text-slate-500 border-b border-slate-200 pb-3">
          Select any cities or regions you'd like to visit in Belgium
        </p>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {belgiumCities.map((city) => {
            const selected = (answers.belgiumCities || []).includes(city);
            return (
              <label
                key={city}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs md:text-sm cursor-pointer transition ${
                  selected
                    ? "border-amber-500 bg-amber-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleMulti("belgiumCities", city)}
                  className="h-4 w-4 rounded border-slate-300 text-amber-600"
                />
                <span>{city}</span>
              </label>
            );
          })}
        </div>
        {(answers.belgiumCities || []).includes("Other / flexible") && (
          <div className="space-y-2 mt-3">
            {errors.belgiumOtherCity && (
              <p className="text-xs text-red-600 font-medium">
                {errors.belgiumOtherCity}
              </p>
            )}
            <input
              type="text"
              value={answers.belgiumOtherCity || ""}
              onChange={(e) => update({ belgiumOtherCity: e.target.value })}
              className={`w-full rounded-2xl border px-3 py-2 text-sm ${
                errors.belgiumOtherCity
                  ? "border-red-300 bg-red-50"
                  : "border-slate-200 bg-white"
              }`}
              placeholder="Please specify the city or region"
            />
          </div>
        )}
      </section>

      <section className="space-y-6 text-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Activities of interest
          </h2>
          <p className="text-xs text-slate-500 border-slate-200 pb-3">
            Select any activities or experiences you'd like to do in Belgium
          </p>
        </div>
        <div className="space-y-6">
          {belgiumActivitiesByCategory.map((categoryGroup) => {
            const categoryErrorKey = `belgiumActivities_${categoryGroup.category}`;
            const hasError = errors[categoryErrorKey];
            return (
              <div key={categoryGroup.category} className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-base font-semibold text-slate-700 text-left">
                    {categoryGroup.category}
                  </h3>
                  {hasError && (
                    <p className="text-xs text-red-600 font-medium">
                      {errors[categoryErrorKey]}
                    </p>
                  )}
                </div>
                {hasError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-2">
                    <p className="text-xs text-red-700">
                      Please select at least one activity from this category
                    </p>
                  </div>
                )}
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {categoryGroup.activities.map((activity) => {
                    const selected = (answers.belgiumActivities || []).includes(
                      activity
                    );
                    return (
                      <label
                        key={activity}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs md:text-sm cursor-pointer transition ${
                          selected
                            ? "border-amber-500 bg-amber-50"
                            : "border-slate-200 bg-white hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => {
                            toggleMulti("belgiumActivities", activity);
                            // Clear category error when an activity is selected
                            if (errors[categoryErrorKey]) {
                              setErrors((prev) => {
                                const newErrors = { ...prev };
                                delete newErrors[categoryErrorKey];
                                return newErrors;
                              });
                            }
                          }}
                          className="h-4 w-4 rounded border-slate-300 text-amber-600 flex-shrink-0"
                        />
                        <span className="break-words">{activity}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-2 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Other Belgium preferences (optional)
        </h2>
        <textarea
          value={answers.belgiumNotes}
          onChange={(e) => update({ belgiumNotes: e.target.value })}
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
          placeholder="Any other thoughts about Belgium - specific places, experiences, or preferences..."
          rows={3}
        />
      </section>
    </div>
  );

  const renderExperienceStep = () => (
    <div className="space-y-4 w-full min-w-0 text-center">
      <h1 className="text-xl font-serif tracking-wide text-slate-900">
        Experience Priorities
      </h1>
      <p className="text-sm text-slate-500 text-center">
        For anything that sounds appealing, give it a number from{" "}
        <strong>1 (must-do)</strong> to <strong>5 (nice-to-have)</strong>. Leave
        it blank if you don't care either way.
      </p>

      {/* Belgium Images Gallery */}
      <section className="space-y-3">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={`${import.meta.env.BASE_URL}images/belgium-main.jpg`}
            alt="Belgium"
            className="w-full h-48 md:h-64 object-cover"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <img
            src={`${import.meta.env.BASE_URL}images/belgium-1.jpg`}
            alt="Belgium"
            className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/belgium-3.jpg`}
            alt="Belgium"
            className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/belgium-4.jpg`}
            alt="Belgium"
            className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </section>
      <div className="space-y-3">
        {experienceRanks.map((label) => (
          <RankRow
            key={label}
            label={label}
            value={answers.experienceRanks[label] || ""}
            onChange={(v) =>
              update({
                experienceRanks: {
                  ...answers.experienceRanks,
                  [label]: v,
                },
              })
            }
          />
        ))}
      </div>
    </div>
  );

  const renderStayStep = () => (
    <div className="space-y-4 w-full min-w-0 text-center">
      <h1 className="text-xl font-serif tracking-wide text-slate-900">
        Accommodation Style
      </h1>
      <p className="text-sm text-slate-500 text-center">
        Same idea: <strong>1 = ideal for this trip</strong>,{" "}
        <strong>5 = lowest priority</strong>. Blank means “let’s mostly skip
        this”.
      </p>
      <div className="space-y-3">
        {stayRanks.map((label) => (
          <RankRow
            key={label}
            label={label}
            value={answers.stayRanks[label] || ""}
            onChange={(v) =>
              update({
                stayRanks: {
                  ...answers.stayRanks,
                  [label]: v,
                },
              })
            }
          />
        ))}
      </div>
    </div>
  );

  const renderComfortStep = () => (
    <div className="space-y-6 w-full min-w-0 text-center">
      <section className="space-y-2 text-center">
        <h1 className="text-xl font-serif tracking-wide text-slate-900">
          Environment & Comfort
        </h1>
        <p className="text-sm text-slate-500">
          Think "what helps me exhale in a new place?"
        </p>
        {errors.envComfort && (
          <p className="text-xs text-red-600 font-medium">
            {errors.envComfort}
          </p>
        )}
        <div className="grid gap-2 md:grid-cols-2">
          {[
            "Clean & bright spaces",
            "Cozy with character and warmth",
            "Lots of space and privacy",
            "Central location even if smaller",
            "Modern, simple design with good Wi-Fi",
          ].map((label) => {
            const selected = (answers.envComfort || []).includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleMulti("envComfort", label)}
                className={`rounded-full border px-3 py-2 text-sm text-left transition ${
                  selected
                    ? "border-amber-500 bg-amber-50 ring-2 ring-amber-200"
                    : "border-slate-200 bg-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Sensitivities (like a health form, but for vibes)
        </h2>
        <p className="text-xs text-slate-500 border-b border-slate-200 pb-3">
          1 = barely a thing • 10 = very important to manage.
        </p>
        {errors.sensitivities && (
          <p className="text-xs text-red-600 font-medium">
            {errors.sensitivities}
          </p>
        )}
        <div className="space-y-3">
          {sensitivities.map((label) => (
            <SliderRow
              key={label}
              label={label}
              checked={answers.sensitivities[label] !== undefined}
              value={answers.sensitivities[label] ?? 5}
              onCheck={(checked) => {
                const copy = { ...answers.sensitivities };
                if (!checked) delete copy[label];
                else copy[label] = copy[label] ?? 5;
                update({ sensitivities: copy });
                // Clear error when a sensitivity is checked
                if (errors.sensitivities && checked) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.sensitivities;
                    return newErrors;
                  });
                }
              }}
              onChange={(v) =>
                update({
                  sensitivities: {
                    ...answers.sensitivities,
                    [label]: v,
                  },
                })
              }
            />
          ))}
        </div>
      </section>

      <section className="space-y-3 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Walking & stairs comfort
        </h2>
        <div className="space-y-3 text-xs text-slate-500">
          <div>
            <div className="mb-1 text-sm text-slate-700">
              Walking / standing (city days, lines, museums)
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="10"
                value={answers.walking}
                onChange={(e) => update({ walking: e.target.value })}
                className="flex-1"
              />
              <span>{answers.walking}/10</span>
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-slate-700">
              Stairs (metro, viewpoints, Eiffel, etc.)
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="10"
                value={answers.stairs}
                onChange={(e) => update({ stairs: e.target.value })}
                className="flex-1"
              />
              <span>{answers.stairs}/10</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderParisStep = () => (
    <div className="space-y-6 w-full min-w-0 text-center">
      <h1 className="text-xl font-serif tracking-wide text-slate-900">
        Paris & Eiffel Tower Day
      </h1>

      {/* Paris Images Gallery */}
      <section className="space-y-3">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={`${import.meta.env.BASE_URL}images/paris-main.jpg`}
            alt="Paris"
            className="w-full h-48 md:h-64 object-cover"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <img
            src={`${import.meta.env.BASE_URL}images/paris-1.jpg`}
            alt="Paris"
            className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/paris-2.jpg`}
            alt="Paris"
            className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/paris-3.jpg`}
            alt="Paris"
            className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/paris-4.jpg`}
            alt="Paris"
            className="w-full h-24 md:h-32 object-cover rounded-lg shadow-md"
          />
        </div>
      </section>

      <section className="space-y-2 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Eiffel Tower Vibes
        </h2>
        {errors.eiffelTime && (
          <p className="text-xs text-red-600 font-medium">
            {errors.eiffelTime}
          </p>
        )}
        <div className="grid gap-2 md:grid-cols-2 text-sm">
          {[
            "Daytime visit",
            "Evening with the sparkle lights",
            "Both day and night if possible",
            "Flexible on timing",
          ].map((label) => {
            const isSelected = answers.eiffelTime === label;
            const handleClick = () => {
              update({ eiffelTime: label });
            };
            const buttonClassName = isSelected
              ? "border-amber-500 bg-amber-50"
              : errors.eiffelTime
              ? "border-red-300 bg-red-50"
              : "border-slate-200 bg-white";
            return (
              <button
                key={`eiffelTime-${label}`}
                type="button"
                onClick={handleClick}
                className={`rounded-full border px-3 py-2 text-left transition ${buttonClassName}`}
                style={
                  isSelected
                    ? { borderColor: "#f59e0b", backgroundColor: "#fffbeb" }
                    : {}
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-2 text-sm text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Going up vs. Enjoying From Below (Prices Vary)
        </h2>
        {errors.eiffelUp && (
          <p className="text-xs text-red-600 font-medium">{errors.eiffelUp}</p>
        )}
        <div className="grid gap-2 md:grid-cols-2">
          {[
            "Definitely want to go up (€14.50-€36.10 adult, €3.70-€18.10 children)",
            "Happy to view from the ground (free)",
            "Open to either, depending on lines & energy",
          ].map((label) => {
            const isSelected = answers.eiffelUp === label;
            const handleClick = () => {
              update({ eiffelUp: label });
            };
            const buttonClassName = isSelected
              ? "border-amber-500 bg-amber-50"
              : errors.eiffelUp
              ? "border-red-300 bg-red-50"
              : "border-slate-200 bg-white";
            return (
              <button
                key={`eiffelUp-${label}`}
                type="button"
                onClick={handleClick}
                className={`rounded-full border px-3 py-2 text-left transition ${buttonClassName}`}
                style={
                  isSelected
                    ? { borderColor: "#f59e0b", backgroundColor: "#fffbeb" }
                    : {}
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 text-sm">
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold text-slate-800">
            Food & Settings Preference
          </h2>
          {errors.eiffelPicnic && (
            <p className="text-xs text-red-600 font-medium">
              {errors.eiffelPicnic}
            </p>
          )}
          {[
            "Picnic nearby would be amazing (€10-€20 per person)",
            "No picnic needed, just a nice café meal (€10-€20 per person)",
            "Either picnic or café is fine (Lib will choose)",
          ].map((label) => {
            const isSelected = answers.eiffelPicnic === label;
            const handleClick = () => {
              update({ eiffelPicnic: label });
            };
            const buttonClassName = isSelected
              ? "border-amber-500 bg-amber-50"
              : errors.eiffelPicnic
              ? "border-red-300 bg-red-50"
              : "border-slate-200 bg-white";
            return (
              <button
                key={`eiffelPicnic-${label}`}
                type="button"
                onClick={handleClick}
                className={`mb-2 rounded-full border px-3 py-2 text-left transition ${buttonClassName}`}
                style={
                  isSelected
                    ? { borderColor: "#f59e0b", backgroundColor: "#fffbeb" }
                    : {}
                }
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold text-slate-800">Photos</h2>
          {errors.eiffelPhotos && (
            <p className="text-xs text-red-600 font-medium">
              {errors.eiffelPhotos}
            </p>
          )}
          {[
            "Photos are a big priority",
            "Just a few photos is fine",
            "Not fussed about photos",
          ].map((label) => {
            const isSelected = answers.eiffelPhotos === label;
            const handleClick = () => {
              update({ eiffelPhotos: label });
            };
            const buttonClassName = isSelected
              ? "border-amber-500 bg-amber-50"
              : errors.eiffelPhotos
              ? "border-red-300 bg-red-50"
              : "border-slate-200 bg-white";
            return (
              <button
                key={`eiffelPhotos-${label}`}
                type="button"
                onClick={handleClick}
                className={`mb-2 rounded-full border px-3 py-2 text-left transition ${buttonClassName}`}
                style={
                  isSelected
                    ? { borderColor: "#f59e0b", backgroundColor: "#fffbeb" }
                    : {}
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-2 text-sm text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Paris "must-dos" (check any that feel non-negotiable)
        </h2>
        <div className="grid gap-2 md:grid-cols-2">
          {parisMusts.map((label) => {
            const selected = (answers.parisMusts || []).includes(label);
            return (
              <label
                key={label}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs md:text-sm ${
                  selected
                    ? "border-amber-500 bg-amber-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleMulti("parisMusts", label)}
                  className="h-4 w-4 rounded border-slate-300 text-amber-600"
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="space-y-2 text-sm text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Extra Eiffel Tower day vibes (optional)
        </h2>
        <textarea
          value={answers.eiffelNotes}
          onChange={(e) => update({ eiffelNotes: e.target.value })}
          className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm"
          placeholder="Picnic by the river? Matching outfits? Chill morning then Eiffel at night?"
        />
      </section>
    </div>
  );

  const renderNovaStep = () => (
    <div className="space-y-6 w-full min-w-0 text-center">
      <section className="space-y-2 text-center">
        <h1 className="text-xl font-serif tracking-wide text-slate-900">
          For Nova
        </h1>
        <p className="text-sm text-slate-500">
          Same ranking system: <strong>1 = her absolute favorite</strong>,{" "}
          <strong>5 = lower priority</strong>.
        </p>
        <div className="space-y-3">
          {novaRanks.map((label) => (
            <RankRow
              key={label}
              label={label}
              value={answers.novaRanks[label] || ""}
              onChange={(v) =>
                update({
                  novaRanks: {
                    ...answers.novaRanks,
                    [label]: v,
                  },
                })
              }
            />
          ))}
        </div>
      </section>

      <section className="space-y-2 text-xs text-slate-500">
        <div className="mb-1 text-sm text-slate-700">
          Her usual energy level on big days
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="10"
            value={answers.novaEnergy}
            onChange={(e) => update({ novaEnergy: e.target.value })}
            className="flex-1"
          />
          <span>{answers.novaEnergy}/10</span>
        </div>
      </section>
    </div>
  );

  const renderSummaryStep = () => (
    <div className="space-y-4 w-full min-w-0 text-center">
      <h1 className="text-xl font-serif tracking-wide text-slate-900">
        Summary & Email
      </h1>
      <p className="text-sm text-slate-500 text-center">
        You can tweak this text before copying or emailing it to Lib.
      </p>
      <textarea
        value={answers.summaryText}
        onChange={(e) => update({ summaryText: e.target.value })}
        className="h-80 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs md:text-sm font-mono"
      />
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={copySummary}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-800"
          >
            📋 Copy Summary
          </button>
          <button
            type="button"
            onClick={emailSummary}
            className="rounded-full bg-amber-500 px-4 py-2 text-sm font-medium shadow-sm hover:bg-amber-600"
          >
            📧 Email Lib
          </button>
        </div>
        {emailSent && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-emerald-600 text-lg">✓</span>
              <p className="text-sm font-medium text-emerald-800">
                Email opened! Your email client should be opening now.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case "budget":
        return renderBudgetStep();
      case "dates":
        return renderDatesStep();
      case "transport":
        return renderTransportStep();
      case "belgium":
        return renderBelgiumStep();
      case "experience":
        return renderExperienceStep();
      case "stay":
        return renderStayStep();
      case "comfort":
        return renderComfortStep();
      case "paris":
        return renderParisStep();
      case "nova":
        return renderNovaStep();
      case "summary":
        return renderSummaryStep();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2eee4] to-[#f8f4ec] overflow-x-hidden">
      <header className="border-b border-amber-100 bg-[#f6f1e6]/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center">
              <h1 className="font-serif text-2xl tracking-[0.15em] sm:tracking-[0.25em] text-slate-800">
                EURO SPACE CAMP
              </h1>
              <p className="text-xs uppercase tracking-[0.15em] sm:tracking-[0.22em] text-amber-700">
                Trip Planner 🌱
              </p>
            </div>
          </div>

          {/* Progress Bar Navigation - Mobile & Desktop */}
          <nav className="mt-2 sm:mt-3 w-full max-w-4xl mx-auto px-2 sm:px-4">
            <div className="relative">
              {/* Progress bar track */}
              <div className="h-2 bg-amber-100/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-800 transition-all duration-300 ease-out"
                  style={{
                    width: `${
                      ((steps.findIndex((s) => s.id === step) + 1) /
                        steps.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              {/* Step indicators - scrollable on mobile */}
              <div className="flex justify-between mt-2 -mx-1 sm:-mx-2 overflow-x-auto pb-2 scrollbar-hide">
                {steps.map((s, index) => {
                  const currentIndex = steps.findIndex((st) => st.id === step);
                  const isCompleted = index < currentIndex;
                  const isCurrent = index === currentIndex;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleStepNavigation(s.id)}
                      className="flex flex-col items-center gap-1 flex-shrink-0 min-w-[60px] sm:min-w-0 sm:flex-1 px-1 sm:px-2 transition"
                      style={{ touchAction: "manipulation" }}
                      title={s.label}
                    >
                      {/* Step circle */}
                      <div
                        className={`w-8 h-8 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                          isCurrent
                            ? "bg-slate-800 text-white shadow-lg scale-110 ring-2 ring-slate-800 ring-offset-2 ring-offset-[#f6f1e6]"
                            : isCompleted
                            ? "bg-slate-600 text-white"
                            : "bg-amber-100 text-slate-400"
                        }`}
                      >
                        {isCompleted ? "✓" : s.icon}
                      </div>

                      {/* Step label */}
                      <span
                        className={`text-[10px] sm:text-xs font-medium text-center leading-tight ${
                          isCurrent
                            ? "text-slate-800 font-bold"
                            : isCompleted
                            ? "text-slate-600"
                            : "text-slate-400"
                        }`}
                      >
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-3 sm:px-4 py-6 w-full">
        <div className="rounded-3xl bg-white/90 p-3 sm:p-6 shadow-xl border border-amber-100 w-full overflow-hidden">
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-lg">⚠️</span>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-red-800 mb-1">
                    Please complete the required fields
                  </h2>
                  <ul className="text-xs text-red-700 space-y-1">
                    {Object.values(errors).map((error, idx) => (
                      <li key={idx}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          {renderCurrentStep()}
          {step !== "summary" && (
            <div className="mt-8 space-y-3">
              <div className="flex justify-center gap-3">
                {steps.findIndex((s) => s.id === step) > 0 && (
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="rounded-full px-4 py-2 text-sm font-medium shadow-sm transition bg-slate-200 hover:bg-slate-300 text-slate-800"
                  >
                    ← Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={goToNextStep}
                  className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm transition ${
                    Object.keys(errors).length > 0
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  {Object.keys(errors).length > 0
                    ? "Fix errors to continue"
                    : "Next →"}
                </button>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={clearCurrentStep}
                  className="text-xs text-slate-500 hover:text-red-600 px-2 py-1 rounded transition"
                  title="Clear this section"
                >
                  🗑️ Clear This Section
                </button>
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-slate-500 hover:text-red-600 px-2 py-1 rounded transition"
                  title="Clear all answers"
                >
                  🗑️ Clear All Answers
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
