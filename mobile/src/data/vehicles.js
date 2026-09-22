import AsyncStorage from '@react-native-async-storage/async-storage';

export const INITIAL_VEHICLES = [
  {
    id: "veh-001",
    make: "BMW",
    model: "3 Series M Sport",
    year: 2023,
    price: 48500,
    mileage: 12400,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    engine: "2.0L Turbocharged I4",
    horsepower: "255 hp",
    drivetrain: "Rear-Wheel Drive (RWD)",
    exteriorColor: "Portimao Blue Metallic",
    interiorColor: "Black Vernasca Leather",
    location: "Apex Central Showroom",
    badge: "Featured",
    vin: "WBA53AY08NFP12948",
    stockNumber: "APX-8492",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Experience the ultimate driving machine with this immaculate 2023 BMW 3 Series M Sport. Combining dynamic performance with executive luxury, this vehicle comes equipped with the complete M Sport package, Shadowline trim, Live Cockpit Professional, and Harman Kardon premium audio.",
    keySpecs: {
      acceleration: "0-60 mph in 5.6s",
      topSpeed: "155 mph",
      fuelEconomy: "26 City / 36 Hwy MPG",
      seating: "5 Passengers",
      warranty: "2 Years / 24,000 Miles Apex Certified"
    },
    features: {
      safety: ["Active Blind Spot Detection", "Lane Departure Warning", "Frontal Collision Warning"],
      comfort: ["Heated Front Seats & Steering Wheel", "Three-Zone Automatic Climate Control"],
      technology: ["14.9-inch Curved Touchscreen Display", "Apple CarPlay & Android Auto"],
      performance: ["M Sport Suspension", "M Aerodynamic Kit"]
    }
  },
  {
    id: "veh-002",
    make: "Mercedes-Benz",
    model: "C-Class C300 4MATIC",
    year: 2024,
    price: 54900,
    mileage: 4200,
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "Sedan",
    engine: "2.0L I4 Turbo with Mild Hybrid",
    horsepower: "255 hp + 20 hp Boost",
    drivetrain: "All-Wheel Drive (4MATIC)",
    exteriorColor: "Obsidian Black Metallic",
    interiorColor: "Neva Grey / Black MB-Tex",
    location: "Apex Westside Gallery",
    badge: "New Arrival",
    vin: "W1KAF46E9R1048291",
    stockNumber: "APX-9102",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The 2024 Mercedes-Benz C300 redefines modern luxury. Featuring S-Class inspired technology including the portrait-oriented MBUX infotainment screen, biometric fingerprint scanner, and 64-color ambient lighting.",
    keySpecs: {
      acceleration: "0-60 mph in 5.3s",
      topSpeed: "130 mph",
      fuelEconomy: "23 City / 33 Hwy MPG",
      seating: "5 Passengers",
      warranty: "Factory Warranty Active (3+ Years)"
    },
    features: {
      safety: ["Guard 360 Vehicle Security", "Active Brake Assist"],
      comfort: ["Panorama Sunroof", "Ventilated & Heated Memory Seats"],
      technology: ["11.9-inch Central Portrait Display", "Burmester 3D Surround Sound"],
      performance: ["DYNAMIC SELECT Drive Modes", "4MATIC All-Wheel Drive"]
    }
  },
  {
    id: "veh-003",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2022,
    price: 132000,
    mileage: 8900,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Coupe",
    engine: "3.0L Twin-Turbo Flat-6",
    horsepower: "443 hp",
    drivetrain: "Rear-Wheel Drive (RWD)",
    exteriorColor: "GT Silver Metallic",
    interiorColor: "Bordeaux Red / Black Leather",
    location: "Apex Performance Vault",
    badge: "Certified Pre-Owned",
    vin: "WP0AA2A92NS240182",
    stockNumber: "APX-7731",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An iconic sports car perfected. This 2022 Porsche 911 Carrera S (992 generation) boasts 443 horsepower, Sport Chrono Package, PASM Sport Suspension, Sport Exhaust System, and 20/21-inch Carrera S wheels.",
    keySpecs: {
      acceleration: "0-60 mph in 3.3s",
      topSpeed: "191 mph",
      fuelEconomy: "18 City / 24 Hwy MPG",
      seating: "2+2 Passengers",
      warranty: "Porsche Approved Certified Pre-Owned 2 Years"
    },
    features: {
      safety: ["Porsche Stability Management (PSM)", "Wet Mode Driving Assist"],
      comfort: ["18-Way Adaptive Sport Seats Plus", "Heated & Ventilated Front Seats"],
      technology: ["PCM 10.9-inch Display", "Apple CarPlay Wireless"],
      performance: ["8-speed Porsche PDK", "Sport Chrono Package"]
    }
  },
  {
    id: "veh-004",
    make: "Audi",
    model: "A4 45 TFSI Quattro",
    year: 2023,
    price: 43900,
    mileage: 16800,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    engine: "2.0L 4-Cylinder TFSI Turbo",
    horsepower: "261 hp",
    drivetrain: "Quattro All-Wheel Drive",
    exteriorColor: "Ibis White",
    interiorColor: "Okapi Brown Leather",
    location: "Apex Central Showroom",
    badge: "Hot Deal",
    vin: "WAUZZZF43PN039124",
    stockNumber: "APX-5510",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Refined, intelligent, and thrilling to drive. This Audi A4 S Line features legendary Quattro all-wheel drive, Audi Virtual Cockpit Plus, Matrix LED Headlights, and Bang & Olufsen 3D Premium Sound System.",
    keySpecs: {
      acceleration: "0-60 mph in 5.2s",
      topSpeed: "130 mph",
      fuelEconomy: "24 City / 32 Hwy MPG",
      seating: "5 Passengers",
      warranty: "Apex Certified 1 Year / 12,000 Miles"
    },
    features: {
      safety: ["Audi Pre Sense Front & Rear", "Side Assist (Blind Spot)"],
      comfort: ["Power Sunroof", "Three-Zone Climate Control"],
      technology: ["Audi Virtual Cockpit 12.3-inch", "Bang & Olufsen Audio"],
      performance: ["S Line Exterior Styling", "Quattro All-Wheel Drive"]
    }
  },
  {
    id: "veh-005",
    make: "Toyota",
    model: "Fortuner Legender 4x4",
    year: 2023,
    price: 49800,
    mileage: 18500,
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    engine: "2.8L Turbocharged Diesel",
    horsepower: "201 hp / 500 Nm Torque",
    drivetrain: "Four-Wheel Drive (4x4)",
    exteriorColor: "Super White & Black Roof",
    interiorColor: "Maroon & Black Premium Leather",
    location: "Apex SUV Hub",
    badge: "Featured",
    vin: "MHFY33G40P7109283",
    stockNumber: "APX-3392",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Command absolute authority on and off the road with the Toyota Fortuner Legender 4x4. Outfitted with aggressive quad-LED headlamps, sequential turn signals, and electronic differential lock.",
    keySpecs: {
      acceleration: "0-60 mph in 9.8s",
      topSpeed: "118 mph",
      fuelEconomy: "14 km/l Combined",
      seating: "7 Passengers",
      warranty: "Toyota Certified Pre-Owned Warranty"
    },
    features: {
      safety: ["7 SRS Airbags", "Vehicle Stability Control (VSC)"],
      comfort: ["Ventilated Front Seats", "Kick-Sensor Powered Tailgate"],
      technology: ["8-inch Infotainment Screen", "JBL 11-Speaker Audio"],
      performance: ["High/Low Range 4x4 Shift-on-Fly", "Paddle Shifters"]
    }
  },
  {
    id: "veh-006",
    make: "Hyundai",
    model: "Creta SX (O) Turbo",
    year: 2024,
    price: 24500,
    mileage: 3100,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    engine: "1.5L Turbo GDi Petrol",
    horsepower: "158 hp",
    drivetrain: "Front-Wheel Drive (FWD)",
    exteriorColor: "Robust Emerald Pearl",
    interiorColor: "Greige & Black Leatherette",
    location: "Apex Westside Gallery",
    badge: "New Arrival",
    vin: "MALC281CHRM049182",
    stockNumber: "APX-1049",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The top-tier Hyundai Creta SX (O) Turbo comes fully packed with Level-2 ADAS driver assistance, dual 10.25-inch connected screens, voice-enabled panoramic sunroof, and Bose 8-speaker audio setup.",
    keySpecs: {
      acceleration: "0-60 mph in 8.9s",
      topSpeed: "115 mph",
      fuelEconomy: "18.4 km/l ARAI Rated",
      seating: "5 Passengers",
      warranty: "Full 3-Year Factory Warranty"
    },
    features: {
      safety: ["Hyundai SmartSense Level 2 ADAS", "6 Airbags Standard"],
      comfort: ["Voice-Controlled Panoramic Sunroof", "8-Way Power Driver Seat"],
      technology: ["Dual 10.25-inch Screen Display", "Bose Audio"],
      performance: ["7-Speed DCT", "Traction Control Modes"]
    }
  },
  {
    id: "veh-007",
    make: "Tesla",
    model: "Model Y Long Range",
    year: 2023,
    price: 46900,
    mileage: 11200,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "SUV",
    engine: "Dual Motor All-Wheel Drive",
    horsepower: "384 hp",
    drivetrain: "All-Wheel Drive (AWD)",
    exteriorColor: "Midnight Silver Metallic",
    interiorColor: "All Black Premium Interior",
    location: "Apex EV Tech Center",
    badge: "Featured",
    vin: "5YJYGDEE8PF192840",
    stockNumber: "APX-EV99",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Step into the electric future with this pristine Tesla Model Y Long Range. Delivering 330 miles of EPA estimated range, Autopilot navigation, glass roof, and access to Tesla's Supercharger network.",
    keySpecs: {
      acceleration: "0-60 mph in 4.8s",
      topSpeed: "135 mph",
      fuelEconomy: "330 Miles Electric Range",
      seating: "5 Passengers",
      warranty: "Tesla Battery Warranty thru 2031"
    },
    features: {
      safety: ["Autopilot Emergency Braking", "Blind Spot Warning"],
      comfort: ["All-Glass Panoramic Roof", "Heated Seats"],
      technology: ["15-inch Touchscreen Display", "OTA Updates"],
      performance: ["Dual Motor AWD", "Fast Supercharging"]
    }
  },
  {
    id: "veh-008",
    make: "Mahindra",
    model: "XUV700 AX7 Luxury Pack",
    year: 2023,
    price: 31200,
    mileage: 14600,
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    engine: "2.2L mHawk Turbo Diesel",
    horsepower: "182 hp / 450 Nm Torque",
    drivetrain: "All-Wheel Drive (AWD)",
    exteriorColor: "Midnight Black",
    interiorColor: "White Leatherette",
    location: "Apex SUV Hub",
    badge: "Hot Deal",
    vin: "MA1AA4700N1049281",
    stockNumber: "APX-7001",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "The feature-packed flagship Mahindra XUV700 AX7 Luxury Pack. Equipped with Smart Door Handles, 12-speaker Sony 3D Immersive Audio, Blind View Monitor, and Level-2 ADAS safety technology.",
    keySpecs: {
      acceleration: "0-60 mph in 9.2s",
      topSpeed: "120 mph",
      fuelEconomy: "16.6 km/l ARAI Rated",
      seating: "7 Passengers",
      warranty: "Apex Certified 1 Year Warranty"
    },
    features: {
      safety: ["Level 2 ADAS Safety Suite", "7 Airbags"],
      comfort: ["Skyroof Panoramic Sunroof", "Memory Driver Seat"],
      technology: ["Dual 10.25-inch Display", "Sony 3D Audio"],
      performance: ["AWD Torque Distribution", "18-inch Alloys"]
    }
  },
  {
    id: "veh-009",
    make: "Toyota",
    model: "Camry XSE Hybrid",
    year: 2024,
    price: 36800,
    mileage: 6400,
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "Sedan",
    engine: "2.5L 4-Cylinder Hybrid System",
    horsepower: "208 Net hp",
    drivetrain: "Front-Wheel Drive (FWD)",
    exteriorColor: "Celestial Silver / Black Roof",
    interiorColor: "Cockpit Red Leather",
    location: "Apex Central Showroom",
    badge: "New Arrival",
    vin: "4T1B31HK9RU102948",
    stockNumber: "APX-8820",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Sleek sportiness meets unmatched Toyota reliability and hybrid efficiency. The 2024 Camry XSE Hybrid features striking two-tone exterior styling, sport-tuned suspension, red leather interior, and 44 MPG city rating.",
    keySpecs: {
      acceleration: "0-60 mph in 7.4s",
      topSpeed: "115 mph",
      fuelEconomy: "44 City / 47 Hwy MPG",
      seating: "5 Passengers",
      warranty: "Toyota Factory Hybrid Battery Warranty"
    },
    features: {
      safety: ["Toyota Safety Sense 2.5+", "Dynamic Radar Cruise"],
      comfort: ["Dual Zone Climate Control", "Leather Heated Seats"],
      technology: ["9-inch Audio Multimedia", "JBL Audio"],
      performance: ["Sport Suspension", "19-inch Gloss Black Alloys"]
    }
  },
  {
    id: "veh-010",
    make: "Jeep",
    model: "Compass Model S 4x4",
    year: 2023,
    price: 29500,
    mileage: 15300,
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    engine: "2.0L Multijet II Turbo Diesel",
    horsepower: "170 hp / 350 Nm Torque",
    drivetrain: "Jeep Active Drive 4x4",
    exteriorColor: "Techno Metallic Green",
    interiorColor: "Black Leatherette",
    location: "Apex SUV Hub",
    badge: "Certified Pre-Owned",
    vin: "1C4NJCBA8PD194820",
    stockNumber: "APX-4421",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "True Trail-Rated pedigree blended with premium urban sophistication. The top-of-the-line Jeep Compass Model S features Selec-Terrain 4x4 system, dual-pane panoramic sunroof, Alpine 9-speaker system, and 360 camera.",
    keySpecs: {
      acceleration: "0-60 mph in 9.5s",
      topSpeed: "118 mph",
      fuelEconomy: "14.9 km/l ARAI Rated",
      seating: "5 Passengers",
      warranty: "Apex Certified 1 Year Warranty"
    },
    features: {
      safety: ["Forward Collision Warning", "6 Airbags"],
      comfort: ["Dual-Pane Panoramic Sunroof", "Power Seats"],
      technology: ["10.1-inch Uconnect 5", "Alpine Audio"],
      performance: ["9-Speed Automatic", "Selec-Terrain 4x4"]
    }
  },
  {
    id: "veh-011",
    make: "Land Rover",
    model: "Range Rover Evoque R-Dynamic",
    year: 2023,
    price: 58900,
    mileage: 9800,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    engine: "2.0L Turbocharged Petrol MHEV",
    horsepower: "246 hp",
    drivetrain: "All-Wheel Drive (AWD)",
    exteriorColor: "Carpathian Grey Metallic",
    interiorColor: "Deep Garnet & Ebony Windsor Leather",
    location: "Apex Performance Vault",
    badge: "Featured",
    vin: "SALDV2BN7PH049281",
    stockNumber: "APX-RR01",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Distinctive coupe-like silhouette combined with legendary Land Rover capability. The Range Rover Evoque SE R-Dynamic features flush deployable door handles, Pivi Pro dual touchscreens, and Meridian 400W Sound System.",
    keySpecs: {
      acceleration: "0-60 mph in 7.0s",
      topSpeed: "143 mph",
      fuelEconomy: "20 City / 27 Hwy MPG",
      seating: "5 Passengers",
      warranty: "Land Rover Approved Certified Pre-Owned"
    },
    features: {
      safety: ["ClearSight Ground View Tech", "Wade Sensing"],
      comfort: ["Fixed Panoramic Roof", "Heated Memory Seats"],
      technology: ["Pivi Pro Dual Touchscreens", "Meridian Sound"],
      performance: ["Terrain Response 2", "20-inch Alloys"]
    }
  },
  {
    id: "veh-012",
    make: "Kia",
    model: "Seltos GT-Line GTX+ Turbo",
    year: 2024,
    price: 23800,
    mileage: 2800,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    engine: "1.5L Turbo GDi Petrol",
    horsepower: "158 hp",
    drivetrain: "Front-Wheel Drive (FWD)",
    exteriorColor: "Pewter Olive Metallic",
    interiorColor: "Black & Gentle Brown Leatherette",
    location: "Apex Westside Gallery",
    badge: "New Arrival",
    vin: "KNAFX4127P6019284",
    stockNumber: "APX-6629",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Bold, connected, and aggressively styled. The 2024 Kia Seltos GTX+ Turbo features dual panoramic 10.25-inch screens, Level-2 ADAS driver assistance suite, Bose 8-speaker audio system, and GT-Line red interior accents.",
    keySpecs: {
      acceleration: "0-60 mph in 8.7s",
      topSpeed: "115 mph",
      fuelEconomy: "17.7 km/l ARAI Rated",
      seating: "5 Passengers",
      warranty: "5-Year / 60,000 Mile Factory Warranty"
    },
    features: {
      safety: ["Kia Drive Wise Level 2 ADAS", "6 Airbags"],
      comfort: ["Smart Air Purifier", "Ventilated Seats"],
      technology: ["Dual 10.25-inch HD Display", "Bose Audio"],
      performance: ["7-Speed DCT", "Drive Modes"]
    }
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: "INQ-849201",
    vehicleId: "veh-001",
    vehicleTitle: "2023 BMW 3 Series M Sport",
    vehiclePrice: 48500,
    fullName: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    phone: "(555) 234-5678",
    contactMethod: "Phone",
    message: "I am interested in scheduling a VIP test drive for this BMW 3 Series this Saturday.",
    visitDate: "2026-09-20",
    visitTime: "10:00 AM",
    status: "New",
    submittedAt: "2026-09-18T08:30:00.000Z"
  },
  {
    id: "INQ-910242",
    vehicleId: "veh-003",
    vehicleTitle: "2022 Porsche 911 Carrera S",
    vehiclePrice: 132000,
    fullName: "Marcus Thorne",
    email: "m.thorne@example.com",
    phone: "(555) 987-6543",
    contactMethod: "Email",
    message: "Could you please send me the complete Porsche CPO inspection report and service logs?",
    visitDate: "",
    visitTime: "",
    status: "Contacted",
    submittedAt: "2026-09-17T14:15:00.000Z"
  }
];

export const MAKES = ["All Makes", "BMW", "Mercedes-Benz", "Porsche", "Audi", "Toyota", "Hyundai", "Tesla", "Mahindra", "Jeep", "Land Rover", "Kia"];
export const BODY_TYPES = ["All Types", "Sedan", "SUV", "Coupe"];
export const FUEL_TYPES = ["All Fuels", "Petrol", "Diesel", "Hybrid", "Electric"];
export const TRANSMISSIONS = ["All Transmissions", "Automatic", "Manual"];

// AsyncStorage Helpers
export async function getStoredVehicles() {
  try {
    const saved = await AsyncStorage.getItem('apex_vehicles');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load vehicles from AsyncStorage", e);
  }
  return INITIAL_VEHICLES;
}

export async function saveVehicles(vehicles) {
  try {
    await AsyncStorage.setItem('apex_vehicles', JSON.stringify(vehicles));
  } catch (e) {
    console.error("Failed to save vehicles to AsyncStorage", e);
  }
}

export async function getStoredInquiries() {
  try {
    const saved = await AsyncStorage.getItem('apex_inquiries');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load inquiries from AsyncStorage", e);
  }
  return INITIAL_INQUIRIES;
}

export async function saveInquiries(inquiries) {
  try {
    await AsyncStorage.setItem('apex_inquiries', JSON.stringify(inquiries));
  } catch (e) {
    console.error("Failed to save inquiries to AsyncStorage", e);
  }
}
