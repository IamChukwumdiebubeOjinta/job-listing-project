import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Job, Params } from "../../../../dto/dto";

const filePath = path.resolve(process.cwd(), "public/data/jobListings.json");

// DELETE - Remove a job by ID
export async function DELETE(
    req: Request,
    { params }: Params
): Promise<NextResponse> {
    const { id } = params;
    let data: Job[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const filteredData = data.filter((job) => job.id !== parseInt(id));

    fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2));

    return NextResponse.json({ message: "Job deleted" }, { status: 200 });
}

// PUT - Update a job by ID
export async function PUT(
    req: Request,
    { params }: Params
): Promise<NextResponse> {
    const { id } = params;
    const updatedJob: Job = await req.json();
    updatedJob.id = parseInt(id);

    let data: Job[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const index = data.findIndex((job) => job.id === parseInt(id));
    data[index] = updatedJob;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: "Job updated" }, { status: 200 });
}
