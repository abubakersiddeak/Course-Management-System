"use client";
import { useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import EnrollmentCard from "./EnrollmentCard";

export default function RecentEnrollments() {
  const { currentUser } = useAuth();
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const fetchRecent = async () => {
      try {
        setLoading(true);
        const token = await currentUser.getIdToken();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/my-enrollments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        if (data.success) {
          setRecentEnrollments(data.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, [currentUser]);

  if (!currentUser || loading) return null;

  if (recentEnrollments.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-800">Continue Learning</h3>
        <Link
          href="/enrolled"
          className="text-sky-600 hover:text-sky-700 text-sm font-medium"
        >
          View All →
        </Link>
      </div>
      <div className="space-y-3">
        {recentEnrollments.map((enrollment) => (
          <EnrollmentCard
            key={enrollment._id}
            enrollment={enrollment}
            compact
          />
        ))}
      </div>
    </div>
  );
}
