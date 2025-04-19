import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

const Directory: React.FC = () => {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState("");

    const handleGetDirections = () => {
        if (!selectedService) {
            alert("Please select a service first.");
            return;
        }
        navigate(`/within-hospital?service=${encodeURIComponent(selectedService)}`);
    };

    const handleGetToChestnutHill = () => {
        navigate("/to-hospital");
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="p-4 bg-white border-b border-gray-200 flex items-center justify-center">
                <h1 className="text-2xl font-bold">Brigham and Women’s Hospital</h1>
            </header>

            <main className="max-w-2xl mx-auto p-6 mt-10 bg-white border rounded-lg shadow">
                <h2 className="text-center text-2xl text-blue-900 mb-6">Find Your Care</h2>

                <label htmlFor="service" className="block font-semibold mb-2">
                    Select a Service
                </label>
                <select
                    id="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md text-base mb-4"
                >
                    <option value="">-- Choose a Service --</option>
                    {directoryData.map((item) => (
                        <option key={item.service} value={item.service}>
                            {item.service}
                        </option>
                    ))}
                </select>

                <div className="flex flex-col gap-3">
                    <Button onClick={handleGetDirections} className="bg-blue-900 text-white">
                        Get Directions
                    </Button>
                    <Button onClick={handleGetToChestnutHill} className="bg-blue-900 text-white">
                        Get to Chestnut Hill
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default Directory;





