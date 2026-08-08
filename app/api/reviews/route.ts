import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { INITIAL_REVIEWS, Review } from "@/data/reviews";

const reviewsFilePath = path.join(process.cwd(), "data", "user_reviews.json");

function readReviewsFromFile(): Review[] {
  try {
    if (fs.existsSync(reviewsFilePath)) {
      const data = fs.readFileSync(reviewsFilePath, "utf8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Failed to read user_reviews.json", error);
  }
  return [];
}

function writeReviewsToFile(reviews: Review[]): boolean {
  try {
    const dirPath = path.dirname(reviewsFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Failed to write to user_reviews.json", error);
    return false;
  }
}

export async function GET() {
  const reviews = readReviewsFromFile();
  return NextResponse.json({ success: true, reviews });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, company, rating, comment, service, avatarUrl, linkedinUrl, projectUrl } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Client name is required." },
        { status: 400 }
      );
    }

    if (!comment || typeof comment !== "string" || comment.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Review comment is required." },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating must be a number between 1 and 5." },
        { status: 400 }
      );
    }

    const dateFormatted = new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: role?.trim() || "Client",
      company: company?.trim() || "Independent Client",
      rating: numericRating,
      comment: comment.trim(),
      service: service?.trim() || "Software Development",
      date: dateFormatted,
      verified: true,
      avatarUrl: avatarUrl?.trim() || undefined,
      linkedinUrl: linkedinUrl?.trim() || undefined,
      projectUrl: projectUrl?.trim() || undefined,
      featured: true,
    };

    const currentReviews = readReviewsFromFile();
    const updatedReviews = [newReview, ...currentReviews];
    writeReviewsToFile(updatedReviews);

    return NextResponse.json({
      success: true,
      review: newReview,
      reviews: updatedReviews,
    });
  } catch (error) {
    console.error("API POST review error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error submitting review." },
      { status: 500 }
    );
  }
}
