import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LeafletMap from "@/LeafletMap/LeafletMap.tsx";
import GGMap from "@/GoogleMap/GoogleMap.tsx";

const directoryData = [
    {
        service: "Allergy and Clinical Immunology",
        specialties:
            "Allergy, (environmental, food, medication, and venoms), asthma, anaphylaxis, angioedema, sinusitis, and immunodeficiency",
        floorSuite: "3rd floor, suite 301 & 5th floor, suite 540",
        phone: "(617) 732–9850",
    },
    {
        service: "Child Care Center (Mon–Fri, 8 a.m.–4:30 p.m.)",
        specialties: "Backup childcare for employees",
        floorSuite: "2nd floor, suite 210",
        phone: "(617) 732–9543",
    },
    {
        service: "Brigham Dermatology Associates (BDA)",
        specialties: "Medical and surgical dermatology",
        floorSuite: "3rd floor, suite 317",
        phone: "(617) 732–9080",
    },
    {
        service: "Brigham Obstetrics and Gynecology Group (BOGG)",
        specialties: "Gynecology, Obstetrics",
        floorSuite: "5th floor, suite 575",
        phone: "(617) 732–9100",
    },
    {
        service: "Brigham Physicians Group (BPG)",
        specialties: "Adult Primary Care",
        floorSuite: "4th floor, suite 428 & 5th floor, suite 530",
        phone: "(617) 732–9900",
    },
    {
        service: "Brigham Psychiatric Specialities",
        specialties: "Psychiatry, Psychology, Social Work",
        floorSuite: "3rd floor, suite 303",
        phone: "(617) 732–9811",
    },
    {
        service: "Center for Pain Medicine",
        specialties: "Multidisciplinary pain management",
        floorSuite: "3rd floor, suite 320",
        phone: "(617) 732–9060",
    },
    {
        service: "Crohn's and Colitis Center",
        specialties:
            "Crohn's disease, inflammatory bowel disease, infusion services, microscopic colitis, pulmonary, rheumatology, ulcerative colitis",
        floorSuite: "2nd floor, suite 201",
        phone: "(617) 732–6389",
    },
    {
        service: "Endoscopy Center",
        specialties:
            "Bacterial overgrowth breath test, colonoscopy, H. pylori breath test, lactose malabsorption breath test, upper endoscopy",
        floorSuite: "2nd floor, suite 202",
        phone: "(617) 732–7426",
    },
    {
        service: "Gretchen S. and Edward A. Fish Center for Women's Health",
        specialties:
            "Cardiology, Dermatology (cosmetic, medical, and surgical), Endocrinology, Gastroenterology, Gynecology, Hematology, Infectious Diseases, Mental Health (social work), General neurology, Nutrition, Primary care, Pulmonary, Renal, Rheumatology, Sleep medicine, Women's Health (Menopause and Midlife Clinic, Obstetric Internal Medicine)",
        floorSuite: "4th floor, suite 402",
        phone: "(617) 732–9300",
    },
    {
        service: "Laboratory (Mon–Fri, 7 a.m.–7 p.m.; Sat, 7 a.m.–3 p.m.)",
        specialties: "Blood work, lab services",
        floorSuite: "1st floor, suite 100",
        phone: "(617) 732–9841",
    },
    {
        service: "Multi-Specialty Clinic",
        specialties:
            "Orthopedic surgery, Vascular surgery, Contact Dermatitis and Occupational Dermatology Program, Pain Medicine and Travel Medicine",
        floorSuite: "1st floor, suite 130",
        phone: "(617) 732–9500",
    },
    {
        service: "Osher Clinical Center for Integrative Health",
        specialties:
            "Acupuncture, health coaching, chiropractic, craniosacral therapy, integrative medicine, structural massage & movement therapies, neurology (movement disorders and headache), echocardiography, and pulmonary. Educational courses: Integrative wellness courses are also offered.",
        floorSuite: "4th floor, suite 422",
        phone: "(617) 732–9700",
    },
    {
        service: "Patient Financial Services",
        specialties: "Patient financial counselling (Payment, Insurance, Billing questions)",
        floorSuite: "2nd floor, suite 204-B",
        phone: "(617) 732–9677",
    },
    {
        service: "Pharmacy (Monday - Friday, 9 am-4 pm excluding holidays)",
        specialties: "Outpatient Pharmacy Service",
        floorSuite: "3rd floor, suite 317",
        phone: "(617) 732–9040",
    },
    {
        service: "Radiology",
        specialties: "Bone Density, Breast Imaging/Mammography, Ultrasound, X-Ray",
        floorSuite: "5th floor, suite 560",
        phone: "(617) 732–9801",
    },
    {
        service: "Radiology, MRI/CT scan",
        specialties: "CT scan, MRI, X-Ray",
        floorSuite: "1st floor, suite 102-B",
        phone: "(617) 732–9821",
    },
    {
        service: "Rehabilitation Services",
        specialties:
            "Orthopedic, sports, neurologic and vestibular Physical Therapy, Men's and Women's pelvic floor Physical Therapy. Hand/Occupational, Therapy Speech Language Pathology",
        floorSuite: "2nd floor, suite 200",
        phone: "(617) 732–9525",
    },
];

const WithinHospital: React.FC = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const initialService = searchParams.get("service") || "";

    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState(initialService);

    const matchedItem = directoryData.find(
        (item) => item.service === toLocation
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Top Buttons */}
            <header className="p-4 bg-white border-b border-gray-200 flex items-center justify-center">
                <div className="flex gap-4">
                    <Button onClick={() => navigate("/to-hospital")}>To Hospital</Button>
                    <Button onClick={() => navigate("/within-hospital")}>
                        Within Hospital
                    </Button>
                </div>
            </header>

            <main className="px-6 py-4">
                <div className="grid grid-cols-10 gap-6">
                    <div className="col-span-10 md:col-span-3 border rounded-md p-4 bg-white shadow">
                        <div className="mb-4">
                            <label htmlFor="fromLocation" className="block font-semibold mb-1">
                                From
                            </label>
                            <select
                                id="fromLocation"
                                value={fromLocation}
                                onChange={(e) => setFromLocation(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">-- Select Starting Point --</option>
                                <option value="Main Lobby">Entrance</option>
                                {/*<option value="Parking Garage">Parking Garage</option>*/}
                                {/*<option value="Cafeteria">Cafeteria</option>*/}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="toLocation" className="block font-semibold mb-1">
                                To
                            </label>
                            <select
                                id="toLocation"
                                value={toLocation}
                                onChange={(e) => setToLocation(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">-- Select a Destination --</option>
                                {directoryData.map((item) => (
                                    <option key={item.service} value={item.service}>
                                        {item.service}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Display the matched item's details */}
                        {matchedItem ? (
                            <div className="mt-6 border-t pt-4">
                                <h3 className="text-blue-700 text-xl font-semibold mb-2">
                                    {matchedItem.service}
                                </h3>
                                <p className="mb-1">
                                    <strong>Specialties:</strong> {matchedItem.specialties}
                                </p>
                                <p className="mb-1">
                                    <strong>Floor and Suite:</strong> {matchedItem.floorSuite}
                                </p>
                                <p>
                                    <strong>Telephone:</strong> {matchedItem.phone}
                                </p>
                            </div>
                        ) : (
                            <div className="mt-6 border-t pt-4">
                                <p className="text-gray-600">No service selected.</p>
                            </div>
                        )}
                    </div>

                    {/* (map placeholder) */}
                    <div className="col-span-10 md:col-span-7 border rounded-md p-4 bg-white shadow flex items-center justify-center">
                        <LeafletMap></LeafletMap>
                        {/*<GGMap></GGMap>*/}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WithinHospital;

