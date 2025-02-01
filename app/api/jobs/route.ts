import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Job } from "../../../dto/dto";

const filePath = path.resolve(process.cwd(), "public/data/jobListings.json");

// GET - Fetch all jobs
export async function GET(): Promise<NextResponse> {
    const data: Job[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return NextResponse.json(data, { status: 200 });
}

// POST - Add a new job
export async function POST(req: Request): Promise<NextResponse> {
    const newJob: Job = await req.json();
    newJob.id = Date.now();

    const data: Job[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    data.unshift(newJob);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(newJob, { status: 201 });
}
