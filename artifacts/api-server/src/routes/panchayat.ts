import { randomUUID } from "node:crypto";
import { asc, sql } from "drizzle-orm";
import { Router, type IRouter } from "express";
import {
  CreatePublicComplaintBody,
  CreatePublicComplaintResponse,
  CreatePublicInquiryBody,
  CreatePublicInquiryResponse,
  GetPortalSummaryResponse,
  ListPanchayatWorksResponse,
} from "@workspace/api-zod";
import {
  db,
  panchayatWorksTable,
  publicComplaintsTable,
  publicInquiriesTable,
} from "@workspace/db";

const router: IRouter = Router();

function makeReference(kind: "INQ" | "GRV"): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const suffix = randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `HGP-${kind}-${year}-${suffix}`;
}

const DEMO_WORKS_DATA = [
  {
    id: 1,
    title: "मुख्य बाजार से बस स्टैंड तक सीसी सड़क निर्माण कार्य (CC Road Construction)",
    category: "सड़क एवं परिवहन",
    location: "वार्ड 1 व 2, मुख्य मार्ग, हरजी",
    description: "सड़क चौड़ीकरण, पक्की सीसी ढलाई और दोनों तरफ कवर्ड जल निकासी नाली का सुदृढ़ निर्माण कार्य।",
    sanctionedAmount: 1450000,
    progress: 75,
    status: "ongoing" as const,
    startDate: "2026-04-10",
    targetDate: "2026-11-30",
    updatedAt: "2026-10-10T00:00:00.000Z",
  },
  {
    id: 2,
    title: "समस्त 7 वार्डों में 120 सौर ऊर्जा (सोलर) स्ट्रीट लाइट स्थापना (Solar Lights)",
    category: "विद्युतीकरण",
    location: "वार्ड 1 से 7, ग्राम हरजी",
    description: "गांव के मुख्य चौराहों, सार्वजनिक गलियों, स्कूल तिराहे और श्मशान मार्ग पर उच्च गुणवत्ता वाली सोलर लाइट स्थापना।",
    sanctionedAmount: 980000,
    progress: 100,
    status: "completed" as const,
    startDate: "2026-02-01",
    targetDate: "2026-08-15",
    updatedAt: "2026-08-15T00:00:00.000Z",
  },
  {
    id: 3,
    title: "सामुदायिक आरओ वाटर प्लांट एवं शुद्ध जल एटीएम स्थापना (RO Water Plant)",
    category: "पेयजल योजना",
    location: "प्राथमिक स्वास्थ्य केंद्र के समीप, हरजी",
    description: "ग्रामीणों को स्वच्छ एवं फ्लोराइड मुक्त पेयजल आपूर्ति हेतु 2000 LPH क्षमता का आधुनिक आरओ प्लांट।",
    sanctionedAmount: 850000,
    progress: 60,
    status: "ongoing" as const,
    startDate: "2026-05-15",
    targetDate: "2026-12-15",
    updatedAt: "2026-09-28T00:00:00.000Z",
  },
  {
    id: 4,
    title: "ग्राम पंचायत भवन जीर्णोद्धार एवं डिजिटल ई-मित्र सेवा केंद्र (Panchayat Center)",
    category: "सार्वजनिक भवन",
    location: "पंचायत सचिवालय परिसर, हरजी",
    description: "नागरिकों की सुविधा हेतु पंचायत भवन की मरम्मत, सोलर रूफटॉप, कंप्यूटर लैब और आधुनिक प्रतीक्षा कक्ष।",
    sanctionedAmount: 1200000,
    progress: 100,
    status: "completed" as const,
    startDate: "2026-01-10",
    targetDate: "2026-06-30",
    updatedAt: "2026-06-30T00:00:00.000Z",
  },
  {
    id: 5,
    title: "अमृत सरोवर ग्राम तालाब गहरीकरण, पक्के घाट एवं वृक्षारोपण (Amrit Sarovar Pond)",
    category: "जल संरक्षण",
    location: "पूर्वी सीमा, ग्राम हरजी",
    description: "वर्षा जल संचयन हेतु ऐतिहासिक तालाब की गाद निकासी, पक्के घाट, सुरक्षित पाथवे और बैठने हेतु बेंच निर्माण।",
    sanctionedAmount: 1650000,
    progress: 45,
    status: "ongoing" as const,
    startDate: "2026-06-01",
    targetDate: "2027-01-20",
    updatedAt: "2026-10-05T00:00:00.000Z",
  },
  {
    id: 6,
    title: "राजकीय उच्च माध्यमिक विद्यालय सुरक्षित चारदीवारी एवं नवीन शौचालय (School Block)",
    category: "शिक्षा एवं विद्यालय",
    location: "स्कूल परिसर, हरजी",
    description: "छात्र-छात्राओं के लिए पृथक आधुनिक शौचालय, रनिंग वाटर सुविधा एवं सुरक्षित बाउंड्री वॉल निर्माण।",
    sanctionedAmount: 750000,
    progress: 15,
    status: "planned" as const,
    startDate: "2026-09-01",
    targetDate: "2027-03-31",
    updatedAt: "2026-09-15T00:00:00.000Z",
  },
  {
    id: 7,
    title: "आवासीय क्षेत्र में भूमिगत पक्की नाली एवं सोखता गड्ढा निर्माण (Underground Drainage)",
    category: "स्वच्छता एवं नाली",
    location: "वार्ड 3, 4 व 5, हरजी",
    description: "गलियों में जलभराव की समस्या के स्थायी निवारण हेतु कवर्ड भूमिगत ड्रेनेज लाइन और सोक-पिट निर्माण।",
    sanctionedAmount: 1100000,
    progress: 0,
    status: "planned" as const,
    startDate: "2026-10-01",
    targetDate: "2027-04-30",
    updatedAt: "2026-10-01T00:00:00.000Z",
  },
  {
    id: 8,
    title: "ठोस एवं तरल कचरा प्रबंधन (SLWM) संसाधन एवं सेग्रीगेशन केंद्र (Waste Unit)",
    category: "स्वच्छता एवं नाली",
    location: "बायपास रोड के पास, हरजी",
    description: "स्वच्छ भारत मिशन ग्रामीण के अंतर्गत कचरा पृथक्करण शेड, कम्पोस्ट पिट एवं ई-रिक्शा द्वारा घर-घर संग्रहण।",
    sanctionedAmount: 800000,
    progress: 100,
    status: "completed" as const,
    startDate: "2026-01-15",
    targetDate: "2026-07-10",
    updatedAt: "2026-07-10T00:00:00.000Z",
  },
];

router.get("/works", async (_req, res): Promise<void> => {
  try {
    const works = await db
      .select()
      .from(panchayatWorksTable)
      .orderBy(asc(panchayatWorksTable.startDate), asc(panchayatWorksTable.id));

    if (works && works.length > 0) {
      res.json(
        ListPanchayatWorksResponse.parse(
          works.map((work) => ({
            ...work,
            updatedAt: work.updatedAt.toISOString(),
          })),
        ),
      );
      return;
    }
  } catch (err) {
    console.warn("DB query for works unavailable, serving demo works fallback:", err);
  }

  res.json(ListPanchayatWorksResponse.parse(DEMO_WORKS_DATA));
});

router.get("/portal-summary", async (_req, res): Promise<void> => {
  try {
    const [counts] = await db
      .select({
        totalWorks: sql<number>`count(*)::int`,
        ongoingWorks: sql<number>`count(*) filter (where ${panchayatWorksTable.status} = 'ongoing')::int`,
        completedWorks: sql<number>`count(*) filter (where ${panchayatWorksTable.status} = 'completed')::int`,
        plannedWorks: sql<number>`count(*) filter (where ${panchayatWorksTable.status} = 'planned')::int`,
        updatedAt: sql<Date | null>`max(${panchayatWorksTable.updatedAt})`,
      })
      .from(panchayatWorksTable);

    if (counts && counts.totalWorks > 0) {
      res.json(
        GetPortalSummaryResponse.parse({
          ...counts,
          updatedAt: counts.updatedAt ?? new Date(),
        }),
      );
      return;
    }
  } catch (err) {
    console.warn("DB query for summary unavailable, serving demo summary fallback:", err);
  }

  res.json(
    GetPortalSummaryResponse.parse({
      totalWorks: DEMO_WORKS_DATA.length,
      ongoingWorks: DEMO_WORKS_DATA.filter((w) => w.status === "ongoing").length,
      completedWorks: DEMO_WORKS_DATA.filter((w) => w.status === "completed").length,
      plannedWorks: DEMO_WORKS_DATA.filter((w) => w.status === "planned").length,
      updatedAt: new Date(),
    }),
  );
});

router.post("/inquiries", async (req, res): Promise<void> => {
  const parsed = CreatePublicInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const reference = makeReference("INQ");
  const [inquiry] = await db
    .insert(publicInquiriesTable)
    .values({ ...parsed.data, reference })
    .returning({ reference: publicInquiriesTable.reference, submittedAt: publicInquiriesTable.submittedAt });

  res.status(201).json(
    CreatePublicInquiryResponse.parse({
      reference: inquiry.reference,
      submittedAt: inquiry.submittedAt,
      message: "Your inquiry has been recorded. Keep this reference for your records.",
    }),
  );
});

router.post("/complaints", async (req, res): Promise<void> => {
  const parsed = CreatePublicComplaintBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const reference = makeReference("GRV");
  const [complaint] = await db
    .insert(publicComplaintsTable)
    .values({ ...parsed.data, reference })
    .returning({
      reference: publicComplaintsTable.reference,
      submittedAt: publicComplaintsTable.submittedAt,
    });

  res.status(201).json(
    CreatePublicComplaintResponse.parse({
      reference: complaint.reference,
      submittedAt: complaint.submittedAt,
      message: "Your grievance has been registered. Keep this reference for your records.",
    }),
  );
});

export default router;
