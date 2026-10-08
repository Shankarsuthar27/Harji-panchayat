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

router.get("/works", async (_req, res): Promise<void> => {
  const works = await db
    .select()
    .from(panchayatWorksTable)
    .orderBy(asc(panchayatWorksTable.startDate), asc(panchayatWorksTable.id));

  res.json(
    ListPanchayatWorksResponse.parse(
      works.map((work) => ({
        ...work,
        updatedAt: work.updatedAt.toISOString(),
      })),
    ),
  );
});

router.get("/portal-summary", async (_req, res): Promise<void> => {
  const [counts] = await db
    .select({
      totalWorks: sql<number>`count(*)::int`,
      ongoingWorks: sql<number>`count(*) filter (where ${panchayatWorksTable.status} = 'ongoing')::int`,
      completedWorks: sql<number>`count(*) filter (where ${panchayatWorksTable.status} = 'completed')::int`,
      plannedWorks: sql<number>`count(*) filter (where ${panchayatWorksTable.status} = 'planned')::int`,
      updatedAt: sql<Date | null>`max(${panchayatWorksTable.updatedAt})`,
    })
    .from(panchayatWorksTable);

  res.json(
    GetPortalSummaryResponse.parse({
      ...counts,
      updatedAt: counts.updatedAt ?? new Date(),
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
